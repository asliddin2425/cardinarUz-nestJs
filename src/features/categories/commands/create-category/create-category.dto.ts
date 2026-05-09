import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
export class CreateCategoryDto { 
    @IsString() 
    @ApiProperty()
    @MaxLength(128) 
    title: string; 
}
