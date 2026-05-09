import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetStaticInfoQuery } from './queries/get-static-info/get-static-info.query';
import { UpdateStaticInfoCommand } from './commands/update-static-info/update-static-info.command';
import { UpdateStaticInfoDto } from './commands/update-static-info/update-static-info.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags("Static-Info")
@ApiBearerAuth("JWT")
@Controller('static-info')
export class StaticInfoController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}
  @Get() get() { return this.queryBus.execute(new GetStaticInfoQuery()); }
  @Patch() @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Body() dto: UpdateStaticInfoDto) { return this.commandBus.execute(new UpdateStaticInfoCommand(dto)); }
}
