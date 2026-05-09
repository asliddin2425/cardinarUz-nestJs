import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('phone_numbers')
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'phone_number', type: 'varchar', length: 16, unique: true })
  phoneNumber: string;
}
