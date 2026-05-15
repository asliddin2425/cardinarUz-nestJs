import { StaticInfo } from '@features/static-info/static-info.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStaticInfoResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Toshkent, Chilonzor tumani, 3-mavze' })
  address: string;

  @ApiProperty({ example: '+998901234567' })
  phoneNumber: string;

  @ApiProperty({ example: 'Dushanba-Shanba: 09:00-18:00' })
  workingHours: string;

  @ApiProperty({ example: 'info@company.uz' })
  email: string;

  @ApiProperty({ example: '2024-01-01T10:00:00.000Z' })
  updatedAt: string;

  constructor(entity: StaticInfo) {
    this.id           = entity.id;
    this.address      = entity.address;
    this.phoneNumber  = entity.phoneNumber;
    this.workingHours = entity.workingHours;
    this.email        = entity.email;
    this.updatedAt    = new Date().toISOString();
  }
}