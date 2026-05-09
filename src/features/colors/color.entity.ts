import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;

  @Column({ type: 'varchar', length: 12, unique: true })
  color: string;
}
