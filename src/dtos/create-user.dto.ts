import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  addressNumber: string;

  @IsNotEmpty()
  phoneNumber: string;
}
