import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetCarMakesQuery } from './queries/get-car-makes/get-car-makes.query';
import { GetCarModelsQuery } from './queries/get-car-models/get-car-models.query';
import { CreateCarMakeCommand } from './commands/create-car-make/create-car-make.command';
import { CreateCarMakeDto } from './commands/create-car-make/create-car-make.dto';
import { CreateCarModelCommand } from './commands/create-car-model/create-car-model.command';
import { CreateCarModelDto } from './commands/create-car-model/create-car-model.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Cars")
@ApiBearerAuth('JWT')
@Controller('cars')
export class CarsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get('makes')
  getMakes() { return this.queryBus.execute(new GetCarMakesQuery()); }

  @Get('models')
  getModels(@Query('makeId') makeId?: number) {
    return this.queryBus.execute(new GetCarModelsQuery(makeId ? +makeId : undefined));
  }

  @Post('makes') @UseGuards(JwtAuthGuard, AdminGuard)
  createMake(@Body() dto: CreateCarMakeDto) { return this.commandBus.execute(new CreateCarMakeCommand(dto)); }

  @Post('models') @UseGuards(JwtAuthGuard, AdminGuard)
  createModel(@Body() dto: CreateCarModelDto) { return this.commandBus.execute(new CreateCarModelCommand(dto)); }
}
