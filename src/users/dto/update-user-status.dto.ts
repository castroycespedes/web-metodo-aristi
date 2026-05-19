import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserStatus } from '../entities/auth-user.entity';

export class UpdateUserStatusDto {
  @ApiProperty({ enum: UserStatus, example: UserStatus.Active })
  @IsEnum(UserStatus)
  status: UserStatus;
}
