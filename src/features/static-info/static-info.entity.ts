import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('static_info')
export class StaticInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  address: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 16 })
  phoneNumber: string;

  @Column({ name: 'working_hours', type: 'varchar', length: 128 })
  workingHours: string;

  @Column({ type: 'varchar', length: 64 })
  email: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
