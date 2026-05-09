import { AddToCartDto } from './add-to-cart.dto';
export class AddToCartCommand { constructor(public readonly userId: number, public readonly dto: AddToCartDto) {} }
