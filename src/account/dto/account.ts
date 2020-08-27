import {
  IsDefined,
  IsString,
  isDefined,
  IsUUID,
  IsNumber,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class ICreateAccountDto {
  @IsDefined()
  @IsUUID()
  uuid: string;

  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsEmail()
  @IsString()
  email: string;

  @IsDefined()
  @IsNumber()
  @IsString()
  phone: number;

  @IsDefined()
  @IsString()
  product: string;
}

export class IUpdateAccountDto {
  @IsUUID()
  @IsDefined()
  uuid: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsDefined()
  @IsOptional()
  password: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsNumber()
  @IsString()
  phone: number;

  @IsOptional()
  @IsString()
  product: string;
}

export class IDeleteAccountDto {
  @IsUUID()
  @IsDefined()
  uuid: string;
}

export class IUuidAccountDto {
  @IsUUID()
  @IsDefined()
  uuid: string;
}
