import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductCategory, PartType } from '../../shared/enums';
import { Material } from '../materials/material.entity';
import { Color } from '../colors/color.entity';

@Entity('parts')
export class CustomPart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column({ type: 'enum', enum: PartType })
  part: PartType;

  @Column({ type: 'varchar', length: 128, nullable: true })
  title: string;

  @Column({ name: 'material_id' })
  materialId: number;

  @ManyToOne(() => Material, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Column({ name: 'color_id' })
  colorId: number;

  @ManyToOne(() => Color, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @Column({ type: 'varchar', length: 256 })
  image: string;
}
