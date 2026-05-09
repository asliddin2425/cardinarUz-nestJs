import { IsString, MaxLength, IsNumber } from 'class-validator';
export class CreateCarModelDto {
  @IsNumber() carMakeId: number;
  @IsString() @MaxLength(64) title: string;
}
