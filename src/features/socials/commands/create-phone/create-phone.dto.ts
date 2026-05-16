import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
export class CreatePhoneDto {
    @ApiProperty()
    @Matches(/^\+998\d{9}$/) 
    phoneNumber: string; 
}
