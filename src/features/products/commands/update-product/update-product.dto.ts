import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from '../create-product/create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
