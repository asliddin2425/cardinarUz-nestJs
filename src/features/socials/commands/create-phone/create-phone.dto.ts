import { Matches } from 'class-validator';
export class CreatePhoneDto { @Matches(/^\+998\d{9}$/) phoneNumber: string; }
