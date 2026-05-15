import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { GetStaticInfoQuery } from './get-static-info.query';
import { GetStaticInfoResponse } from './get-statsic-info.response';

@ApiTags('Static Info')
@Controller('static-info')
export class GetStaticInfoController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({
    summary: 'Get static company info',
    description:
      'Returns the singleton StaticInfo record. ' +
      'There is always exactly one record in the database.',
  })
  @ApiOkResponse({
    description: 'StaticInfo returned successfully',
    type: GetStaticInfoResponse,
  })
  @ApiNotFoundResponse({ description: 'StaticInfo not seeded yet' })
  async getStaticInfo(): Promise<GetStaticInfoResponse> {
    return this.queryBus.execute(new GetStaticInfoQuery());
  }
}