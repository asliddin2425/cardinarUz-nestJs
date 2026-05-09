import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetBannersQuery } from './queries/get-banners/get-banners.query';
import { CreateBannerCommand } from './commands/create-banner/create-banner.command';
import { CreateBannerDto } from './commands/create-banner/create-banner.dto';
import { UpdateBannerCommand } from './commands/update-banner/update-banner.command';
import { UpdateBannerDto } from './commands/update-banner/update-banner.dto';
import { DeleteBannerCommand } from './commands/delete-banner/delete-banner.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Banners")
@ApiBearerAuth('JWT')
@Controller('banners')
export class BannersController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}
  @Get() findAll(@Query('active') active?: string) {
    return this.queryBus.execute(new GetBannersQuery(active === 'true'));
  }

  @Post() 
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateBannerDto) { 
    return this.commandBus.execute(new CreateBannerCommand(dto)); 
  }

  @Patch(':id') 
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: number, @Body() dto: UpdateBannerDto) { 
    return this.commandBus.execute(new UpdateBannerCommand(+id, dto)); 
  }

  @Delete(':id') @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: number) { 
    return this.commandBus.execute(new DeleteBannerCommand(+id)); 
  }
}
