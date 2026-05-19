import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(80)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(40)
  phone!: string;

  @IsInt()
  @Min(4)
  @Max(25)
  age!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  message!: string;
}
