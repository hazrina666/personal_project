import {
  IsDefined,
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ICreateBranchDto {
  @IsUUID('4')
  @IsDefined()
  uuid: string;

  @IsString()
  @IsDefined()
  name: string;

  @IsUUID('4')
  @IsDefined()
  corporateUuid: string;

  @IsNumber()
  @IsDefined()
  landingPhone: number;

  @IsString()
  @IsDefined()
  workshop: string[];
}

export class IUuidBranchDto {
  @IsUUID('4')
  @IsDefined()
  uuid: string;
}

export class IDeleteBranchDto {
  @IsString()
  @IsDefined()
  uuid: string;
}

export class IUpdateBranchDto {
  @IsUUID('4')
  @IsDefined()
  uuid: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsUUID('4')
  @IsOptional()
  corporateUuid?: string;

  @IsNumber()
  @IsOptional()
  landingPhone?: number;

  @IsString()
  @IsOptional()
  workshop?: string[];
}
