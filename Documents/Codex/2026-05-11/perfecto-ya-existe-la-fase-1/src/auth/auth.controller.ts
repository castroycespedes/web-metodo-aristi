import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser as CurrentUserPayload } from '../common/interfaces/current-user.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Rotate refresh token and issue new tokens' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout current user' })
  logout(@CurrentUser() user: CurrentUserPayload) {
    return this.authService.logout(user);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user' })
  me(@CurrentUser() user: CurrentUserPayload) {
    return this.authService.me(user);
  }
}
