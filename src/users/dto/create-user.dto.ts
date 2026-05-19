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

  @ApiPropertyOptional({ example: 'jane.doe' })
  @IsOptional()
  @IsString()
  @Length(3, 80)
  username?: string;

  @ApiProperty({ minLength: 8, example: 'StrongPassword123' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  roleIds?: string[];
}
