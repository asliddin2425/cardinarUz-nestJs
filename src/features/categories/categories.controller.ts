import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetCategoriesQuery } from './queries/get-categories/get-categories.query';
import { CreateCategoryCommand } from './commands/create-category/create-category.command';
import { CreateCategoryDto } from './commands/create-category/create-category.dto';
import { UpdateCategoryCommand } from './commands/update-category/update-category.command';
import { UpdateCategoryDto } from './commands/update-category/update-category.dto';
import { DeleteCategoryCommand } from './commands/delete-category/delete-category.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories - Api')
@ApiBearerAuth('JWT')
@Controller('categories')
export class CategoriesController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get() 
  findAll() { 
    return this.queryBus.execute(new GetCategoriesQuery()); 
  }

  @Post() 
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateCategoryDto) { 
    return this.commandBus.execute(new CreateCategoryCommand(dto)); 
  }

  @Patch(':id') 
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) { 
    return this.commandBus.execute(new UpdateCategoryCommand(+id, dto)); 
  }


  @Delete(':id') 
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: number) { 
    return this.commandBus.execute(new DeleteCategoryCommand(+id)); 
  }
}
