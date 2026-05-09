import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional } from 'class-validator';
export class UpdateCategoryDto { 
    @IsOptional() 
    @IsString() 
    @ApiProperty()
    @MaxLength(128) 
    title?: string; 
}
