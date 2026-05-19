import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CurrentUser } from '../common/interfaces/current-user.interface';
import { AuthUser, UserStatus } from '../users/entities/auth-user.entity';
import { UserAuthProfile, UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string | null;
    roles: string[];
    permissions: string[];
  };
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

    if (!user || user.status !== UserStatus.Active) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const profile = await this.usersService.toAuthProfile(user);
    const tokens = await this.generateTokens(profile);
    await this.storeRefreshToken(user.id, tokens.refreshToken);
    await this.usersService.updateLastLogin(user.id);

    return this.buildAuthResponse(profile, tokens);
  }

  async refresh(dto: RefreshTokenDto): Promise<AuthResponse> {
    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(dto.refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findByIdWithRefreshToken(payload.sub);
    if (!user || user.status !== UserStatus.Active || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshMatches = await bcrypt.compare(
      dto.refreshToken,
      user.refreshTokenHash,
    );

    if (!refreshMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const profile = await this.usersService.toAuthProfile(user);
    const tokens = await this.generateTokens(profile);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return this.buildAuthResponse(profile, tokens);
  }

  async logout(user: CurrentUser): Promise<{ message: string }> {
    await this.usersService.setRefreshTokenHash(user.id, null);
    return { message: 'Logged out successfully' };
  }

  async me(user: CurrentUser): Promise<UserAuthProfile> {
    return this.usersService.getAuthProfile(user.id);
  }

  async validateJwtPayload(payload: JwtPayload): Promise<CurrentUser> {
    const profile = await this.usersService.getAuthProfile(payload.sub);
    if (profile.status !== UserStatus.Active) {
      throw new UnauthorizedException('User is not active');
    }

    return {
      id: profile.id,
      email: profile.email,
      username: profile.username,
      roles: profile.roles,
      permissions: profile.permissions,
    };
  }

  private async generateTokens(user: UserAuthProfile) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.accessSecret'),
        expiresIn: this.configService.get<string>('jwt.accessExpiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const saltRounds = this.configService.get<number>('app.bcryptSaltRounds') ?? 10;
    const refreshTokenHash = await bcrypt.hash(refreshToken, saltRounds);
    await this.usersService.setRefreshTokenHash(userId, refreshTokenHash);
  }

  private buildAuthResponse(
    user: UserAuthProfile,
    tokens: { accessToken: string; refreshToken: string },
  ): AuthResponse {
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        roles: user.roles,
        permissions: user.permissions,
      },
    };
  }
}
