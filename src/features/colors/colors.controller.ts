import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetColorsQuery } from './queries/get-colors/get-colors.query';
import { CreateColorCommand } from './commands/create-color/create-color.command';
import { CreateColorDto } from './commands/create-color/create-color.dto';
import { UpdateColorCommand } from './commands/update-color/update-color.command';
import { UpdateColorDto } from './commands/update-color/update-color.dto';
import { DeleteColorCommand } from './commands/delete-color/delete-color.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags("Colors")
@ApiBearerAuth("JWT")
@Controller('colors')
export class ColorsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}
  @Get() findAll() { return this.queryBus.execute(new GetColorsQuery()); }
  @Post() @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateColorDto) { return this.commandBus.execute(new CreateColorCommand(dto)); }
  @Patch(':id') @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: number, @Body() dto: UpdateColorDto) { return this.commandBus.execute(new UpdateColorCommand(+id, dto)); }
  @Delete(':id') @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: number) { return this.commandBus.execute(new DeleteColorCommand(+id)); }
}
