import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

function extractRefreshTokenFromBody(request: Request): string | null {
  const body = request.body as { refreshToken?: unknown };
  return typeof body.refreshToken === 'string' ? body.refreshToken : null;
}

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractRefreshTokenFromBody]),
      ignoreExpiration: false,
      passReqToCallback: false,
      secretOrKey:
        configService.get<string>('jwt.refreshSecret') ?? 'change_me_refresh',
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
