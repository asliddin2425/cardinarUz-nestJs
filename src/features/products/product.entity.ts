import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, JoinColumn,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ProductColor } from './product-color.entity';
import { Category } from '@features/categories/category.entity';
import { ProductStatus } from '@shared/enums';
import { Articul } from '@features/articuls/articul.entity';


@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (cat) => cat.products, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'varchar', length: 128, unique: true })
  title: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ProductStatus, nullable: true })
  status: ProductStatus;

  @Column({ name: 'is_premium', type: 'boolean', default: false })
  isPremium: boolean;

  @OneToMany(() => ProductImage, (img) => img.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => ProductColor, (pc) => pc.product, { cascade: true })
  productColors: ProductColor[];

  @OneToMany(() => Articul, (a) => a.product)
  articuls: Articul[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
