import { Body, Controller, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateStaticInfoCommand } from './update-static-info.command';
import { UpdateStaticInfoDto } from './update-static-info.dto';
import { UpdateStaticInfoResponse } from './update-static-info.response';

@ApiTags('Static Info')
@Controller('static-info')
export class UpdateStaticInfoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update static company info (Admin only)',
    description: 'Partially updates the singleton StaticInfo record.',
  })
  @ApiBody({ type: UpdateStaticInfoDto })
  @ApiOkResponse({
    description: 'StaticInfo updated successfully',
    type: UpdateStaticInfoResponse,
  })
  @ApiNotFoundResponse({ description: 'StaticInfo not seeded yet' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT' })
  async updateStaticInfo(
    @Body() dto: UpdateStaticInfoDto,
  ): Promise<UpdateStaticInfoResponse> {
    return this.commandBus.execute(
      new UpdateStaticInfoCommand(
        dto.address,
        dto.phoneNumber,
        dto.workingHours,
        dto.email,
      ),
    );
  }
}