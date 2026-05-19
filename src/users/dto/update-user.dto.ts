import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'jane.doe' })
  @IsOptional()
  @IsString()
  @Length(3, 80)
  username?: string;

  @ApiPropertyOptional({ example: 'https://cdn.taskflow.local/avatar.png' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
