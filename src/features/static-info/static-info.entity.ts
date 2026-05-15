// import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

// @Entity('static_info')
// export class StaticInfo {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 128 })
//   address: string;

//   @Column({ name: 'phone_number', type: 'varchar', length: 16 })
//   phoneNumber: string;

//   @Column({ name: 'working_hours', type: 'varchar', length: 128 })
//   workingHours: string;

//   @Column({ type: 'varchar', length: 64 })
//   email: string;

//   @UpdateDateColumn({ name: 'updated_at' })
//   updatedAt: Date;
// }

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('static_info')
export class StaticInfo {
  @ApiProperty({ example: 1, description: 'Singleton ID (always 1)' })
  @PrimaryColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Toshkent, Chilonzor tumani, 3-mavze' })
  @Column({ type: 'varchar', length: 128 })
  address: string;

  @ApiProperty({ example: '+998901234567' })
  @Column({ type: 'varchar', length: 16, name: 'phoneNumber' })
  phoneNumber: string;

  @ApiProperty({ example: 'Dushanba-Shanba: 09:00-18:00' })
  @Column({ type: 'varchar', length: 128, name: 'workingHours' })
  workingHours: string;

  @ApiProperty({ example: 'info@company.uz' })
  @Column({ type: 'varchar', length: 64 })
  email: string;
}