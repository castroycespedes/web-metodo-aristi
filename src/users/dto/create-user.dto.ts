import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@taskflow.local' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'taskflow.user' })
  @IsString()
  @Length(3, 80)
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ example: 'Task' })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Flow' })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  lastName?: string;

  @ApiPropertyOptional({ type: [String], format: 'uuid' })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  roleIds?: string[];
}
