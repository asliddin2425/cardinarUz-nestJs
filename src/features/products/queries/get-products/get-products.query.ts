import { PaginationDto } from '../../../../shared/dto/pagination.dto';
import { IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProductStatus } from '../../../../shared/enums';

export class GetProductsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isPremium?: boolean;

  @IsOptional()
  categoryId?: number;
}

export class GetProductsQuery {
  constructor(public readonly dto: GetProductsDto) {}
}
