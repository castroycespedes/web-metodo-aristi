import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignOptions } from 'jsonwebtoken';
import { CurrentUser } from '../common/interfaces/current-user.interface';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface RefreshPayload {
  sub: string;
  email: string;
  tokenType: 'refresh';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: CurrentUser;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmailWithPassword(dto.email);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.comparePassword(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const currentUser = this.usersService.toCurrentUser(user);
    const tokens = await this.issueTokens(currentUser);
    await this.usersService.setRefreshTokenHash(user.id, tokens.refreshToken);
    await this.usersService.touchLastLogin(user.id);

    return {
      ...tokens,
      user: currentUser,
    };
  }

  async refresh(dto: RefreshTokenDto): Promise<AuthResponse> {
    const payload = await this.verifyRefreshToken(dto.refreshToken);
    const user = await this.usersService.findByIdWithRefreshToken(payload.sub);

    if (!user || !user.isActive || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isRefreshTokenValid = await bcrypt.compare(
      dto.refreshToken,
      user.refreshTokenHash,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const currentUser = this.usersService.toCurrentUser(user);
    const tokens = await this.issueTokens(currentUser);
    await this.usersService.setRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: currentUser,
    };
  }

  async logout(user: CurrentUser): Promise<{ loggedOut: true }> {
    await this.usersService.clearRefreshToken(user.id);
    return { loggedOut: true };
  }

  me(user: CurrentUser): CurrentUser {
    return user;
  }

  private async issueTokens(user: CurrentUser) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
    };
    const refreshPayload: RefreshPayload = {
      sub: user.id,
      email: user.email,
      tokenType: 'refresh',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('jwt.accessSecret'),
        expiresIn: (this.configService.get<string>('jwt.accessExpiresIn') ??
          '15m') as SignOptions['expiresIn'],
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: this.configService.getOrThrow<string>('jwt.refreshSecret'),
        expiresIn: (this.configService.get<string>('jwt.refreshExpiresIn') ??
          '7d') as SignOptions['expiresIn'],
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async verifyRefreshToken(token: string): Promise<RefreshPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<RefreshPayload>(token, {
        secret: this.configService.getOrThrow<string>('jwt.refreshSecret'),
      });

      if (payload.tokenType !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
