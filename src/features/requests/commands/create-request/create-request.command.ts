import { CreateRequestDto } from './create-request.dto';
export class CreateRequestCommand { constructor(public readonly dto: CreateRequestDto, public readonly userId?: number) {} }
