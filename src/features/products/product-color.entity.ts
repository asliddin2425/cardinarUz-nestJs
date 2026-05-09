import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Color } from '../colors/color.entity';

@Entity('product_colors')
export class ProductColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (p) => p.productColors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'color_id' })
  colorId: number;

  @ManyToOne(() => Color, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'color_id' })
  color: Color;
}
