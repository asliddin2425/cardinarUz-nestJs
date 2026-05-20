// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { NotFoundException } from '@nestjs/common';
// import { CreateProductCommand } from './create-product.command';
// import { Product } from '../../product.entity';
// import { ProductImage } from '../../product-image.entity';
// import { ProductColor } from '../../product-color.entity';
// import { Category } from '../../../categories/category.entity';

// @CommandHandler(CreateProductCommand)
// export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
//   constructor(
//     @InjectRepository(Product) private readonly productRepo: Repository<Product>,
//     @InjectRepository(ProductImage) private readonly imageRepo: Repository<ProductImage>,
//     @InjectRepository(ProductColor) private readonly colorRepo: Repository<ProductColor>,
//     @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
//   ) {}

//   async execute({ dto }: CreateProductCommand) {
//     const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
//     if (!category) throw new NotFoundException('Kategoriya topilmadi');

//     const product = this.productRepo.create({
//       categoryId: dto.categoryId,
//       title: dto.title,
//       price: dto.price,
//       description: dto.description,
//       status: dto.status,
//       isPremium: dto.isPremium ?? false,
//     });

//     await this.productRepo.save(product);

//     if (dto.images?.length) {
//       const images = dto.images.map((img) =>
//         this.imageRepo.create({ productId: product.id, ...img }),
//       );
//       await this.imageRepo.save(images);
//     }

//     if (dto.colorIds?.length) {
//       const colors = dto.colorIds.map((colorId) =>
//         this.colorRepo.create({ productId: product.id, colorId }),
//       );
//       await this.colorRepo.save(colors);
//     }

//     return this.productRepo.findOne({
//       where: { id: product.id },
//       relations: ['images', 'productColors', 'productColors.color', 'category'],
//     });
//   }
// }
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { CreateProductCommand } from './create-product.command';

import { Product } from '../../product.entity';
import { ProductImage } from '../../product-image.entity';
import { ProductColor } from '../../product-color.entity';
import { Category } from '../../../categories/category.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly imageRepo: Repository<ProductImage>,

    @InjectRepository(ProductColor)
    private readonly colorRepo: Repository<ProductColor>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async execute({ dto }: CreateProductCommand) {
    // category tekshirish
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Kategoriya topilmadi');
    }

    // product yaratish
    const product = this.productRepo.create({
      categoryId: dto.categoryId,
      title: dto.title,
      price: dto.price,
      description: dto.description,
      status: dto.status,
      isPremium: dto.isPremium ?? false,
    });

    await this.productRepo.save(product);

    // images saqlash
    if (dto.images && dto.images.length > 0) {
      const images = dto.images.map((image: { image: string; position: number }) =>
        this.imageRepo.create({
          productId: product.id,
          image: image.image,
          position: image.position,
        }),
      );

      await this.imageRepo.save(images);
    }

    // colors saqlash
    if (dto.colorIds && dto.colorIds.length > 0) {
      const colors = dto.colorIds.map((colorId: number) =>
        this.colorRepo.create({
          productId: product.id,
          colorId,
        }),
      );

      await this.colorRepo.save(colors);
    }

    // productni qaytarish
    return await this.productRepo.findOne({
      where: { id: product.id },
      relations: [
        'images',
        'productColors',
        'productColors.color',
        'category',
      ],
    });
  }
}