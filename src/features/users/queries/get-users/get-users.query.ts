import { PaginationDto } from '../../../../shared/dto/pagination.dto';

export class GetUsersQuery {
  constructor(public readonly pagination: PaginationDto) {}
}
