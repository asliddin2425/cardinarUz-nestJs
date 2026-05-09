import { IsString, MaxLength } from 'class-validator';
export class CreateCarMakeDto { @IsString() @MaxLength(64) title: string; }
