import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductCategory } from '../../shared/enums';

@Entity('custom_models')
export class CustomModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column({ type: 'varchar', length: 128, unique: true })
  title: string;

  @Column({ type: 'varchar', length: 256 })
  image: string;
}
