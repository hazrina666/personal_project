import {
  IsDefined,
  IsString,
  isDefined,
  IsUUID,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ICreateVehicleDto {
  @IsDefined()
  @IsUUID('4')
  uuid: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  numberPlate: string;

  @IsDefined()
  @IsString()
  brand: string;

  @IsDefined()
  @IsString()
  model: string;

  @IsDefined()
  @IsNumber()
  price: number;
}

export class IUuidVehicleDto {
  @IsDefined()
  @IsUUID('4')
  uuid: string;
}

export class IUpdateVehicleDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  numberPlate: string;

  @IsDefined()
  @IsString()
  brand: string;

  @IsDefined()
  @IsString()
  model: string;

  @IsDefined()
  @IsNumber()
  price: number;
}

export class IDeleteDto {
  @IsDefined()
  @IsUUID('4')
  uuid: string;
}
