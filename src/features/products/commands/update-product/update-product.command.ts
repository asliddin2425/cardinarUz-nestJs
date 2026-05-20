import { UpdateProductDto } from "./update-product.dto";

export class UpdateProductCommand {
     constructor(
       public readonly id: number,
       public readonly dto: UpdateProductDto,
     ) {}
   }