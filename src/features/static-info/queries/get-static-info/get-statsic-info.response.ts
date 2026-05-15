import { StaticInfo } from '@features/static-info/static-info.entity';
import { ApiProperty } from '@nestjs/swagger';


export class GetStaticInfoResponse {
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

  constructor(entity: StaticInfo) {
    this.id           = entity.id;
    this.address      = entity.address;
    this.phoneNumber  = entity.phoneNumber;
    this.workingHours = entity.workingHours;
    this.email        = entity.email;
  }
}