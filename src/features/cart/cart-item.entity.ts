import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { Articul } from '../articuls/articul.entity';
import { User } from '../users/user.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'articul_id' })
  articulId: number;

  @ManyToOne(() => Articul, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'articul_id' })
  articul: Articul;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}
