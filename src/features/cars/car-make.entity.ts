import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CarModel } from './car-model.entity';

@Entity('car_makes')
export class CarMake {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;

  @OneToMany(() => CarModel, (m) => m.carMake)
  carModels: CarModel[];
}
