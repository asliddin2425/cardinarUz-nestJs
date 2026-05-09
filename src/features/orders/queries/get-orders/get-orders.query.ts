import { PaginationDto } from '../../../../shared/dto/pagination.dto';
export class GetOrdersQuery { constructor(public readonly pagination: PaginationDto, public readonly userId?: number) {} }
