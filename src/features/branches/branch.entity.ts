import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { BranchType } from '../../shared/enums';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  title: string;

  @Column({ type: 'varchar', length: 128 })
  address: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 64 })
  region: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 16 })
  phoneNumber: string;

  @Column({ type: 'decimal', precision: 12, scale: 9 })
  longitude: number;

  @Column({ type: 'decimal', precision: 12, scale: 9 })
  latitude: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'branch_type', type: 'enum', enum: BranchType })
  branchType: BranchType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
