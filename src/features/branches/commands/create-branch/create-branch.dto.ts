import { IsString, MaxLength, IsNumber, IsEnum, IsBoolean, IsOptional, Matches } from 'class-validator';
import { BranchType } from '../../../../shared/enums';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBranchDto {
  @IsString() 
  @MaxLength(128) 
  @ApiProperty()
  title: string;

  @IsString() 
  @MaxLength(128) 
  @ApiProperty()
  address: string;


  @IsOptional() 
  @IsString() 
  @MaxLength(64) 
  @ApiProperty()
  district?: string;

  @IsString() 
  @MaxLength(64) 
  @ApiProperty()
  region: string;


  @Matches(/^\+998\d{9}$/) 
  @ApiProperty()
  phoneNumber: string;

  @IsNumber()
  @ApiProperty()
  longitude: number;

  @IsNumber() 
  @ApiProperty()
  latitude: number;

  @IsOptional() 
  @IsBoolean() 
  @ApiProperty()
  isActive?: boolean;

  @IsEnum(BranchType) 
  @ApiProperty()
  branchType: BranchType;
}
