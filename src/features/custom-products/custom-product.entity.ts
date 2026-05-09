import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ProductCategory } from '../../shared/enums';
import { CarMake } from '../cars/car-make.entity';
import { CarModel } from '../cars/car-model.entity';
import { CustomModel } from './custom-model.entity';

@Entity('custom_products')
export class CustomProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', type: 'varchar', length: 64 })
  fullName: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 16 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  email: string;

  @Column({ name: 'car_make_id' })
  carMakeId: number;

  @ManyToOne(() => CarMake, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'car_make_id' })
  carMake: CarMake;

  @Column({ name: 'car_model_id' })
  carModelId: number;

  @ManyToOne(() => CarModel, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'car_model_id' })
  carModel: CarModel;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column({ name: 'model_id' })
  modelId: number;

  @ManyToOne(() => CustomModel, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'model_id' })
  model: CustomModel;

  @Column({ name: 'with_logo', type: 'boolean' })
  withLogo: boolean;

  @Column({ type: 'varchar', length: 256 })
  image: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
