import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { CarModel } from '../cars/car-model.entity';

@Entity('articuls')
export class Articul {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (p) => p.articuls, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'car_model_id' })
  carModelId: number;

  @ManyToOne(() => CarModel, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'car_model_id' })
  carModel: CarModel;
}
