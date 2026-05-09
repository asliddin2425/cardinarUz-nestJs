import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar', length: 128, unique: true }) title: string;
  @OneToMany(() => Product, (p) => p.category) products: Product[];
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
