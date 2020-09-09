import {
  IsDefined,
  IsString,
  isDefined,
  IsUUID,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class createUserDto {
  @IsDefined()
  @IsString()
  uuid: string;

  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  bio: string;
}

export class IUserUuid {
  @IsDefined()
  @IsUUID()
  uuid: string;
}

export class updateUserDto {
  @IsDefined()
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  bio: string;
}
