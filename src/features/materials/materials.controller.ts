import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetMaterialsQuery } from './queries/get-materials/get-materials.query';
import { CreateMaterialCommand } from './commands/create-material/create-material.command';
import { CreateMaterialDto } from './commands/create-material/create-material.dto';
import { UpdateMaterialCommand } from './commands/update-material/update-material.command';
import { UpdateMaterialDto } from './commands/update-material/update-material.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Materials")
@ApiBearerAuth("JWT")
@Controller('materials')
export class MaterialsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}
  @Get() findAll() { return this.queryBus.execute(new GetMaterialsQuery()); }
  @Post() @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateMaterialDto) { return this.commandBus.execute(new CreateMaterialCommand(dto)); }
  @Patch(':id') @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: number, @Body() dto: UpdateMaterialDto) { return this.commandBus.execute(new UpdateMaterialCommand(+id, dto)); }
}
