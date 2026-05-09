import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CarMake } from './car-make.entity';

@Entity('car_models')
export class CarModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'car_make_id' })
  carMakeId: number;

  @ManyToOne(() => CarMake, (m) => m.carModels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'car_make_id' })
  carMake: CarMake;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;
}
