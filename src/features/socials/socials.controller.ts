import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { GetSocialsQuery } from './queries/get-socials/get-socials.query';
import { GetPhonesQuery } from './queries/get-phones/get-phones.query';
import { CreateSocialCommand } from './commands/create-social/create-social.command';
import { CreateSocialDto } from './commands/create-social/create-social.dto';
import { DeleteSocialCommand } from './commands/delete-social/delete-social.command';
import { CreatePhoneCommand } from './commands/create-phone/create-phone.command';
import { CreatePhoneDto } from './commands/create-phone/create-phone.dto';
import { DeletePhoneCommand } from './commands/delete-phone/delete-phone.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Socials")
@ApiBearerAuth("JWT")
@Controller('socials')
export class SocialsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get() getSocials() { return this.queryBus.execute(new GetSocialsQuery()); }
  @Get('phones') getPhones() { return this.queryBus.execute(new GetPhonesQuery()); }

  @Post() @UseGuards(JwtAuthGuard, AdminGuard)
  createSocial(@Body() dto: CreateSocialDto) { return this.commandBus.execute(new CreateSocialCommand(dto)); }

  @Delete(':id') @UseGuards(JwtAuthGuard, AdminGuard)
  deleteSocial(@Param('id') id: number) { return this.commandBus.execute(new DeleteSocialCommand(+id)); }

  @Post('phones') @UseGuards(JwtAuthGuard, AdminGuard)
  createPhone(@Body() dto: CreatePhoneDto) { return this.commandBus.execute(new CreatePhoneCommand(dto)); }

  @Delete('phones/:id') @UseGuards(JwtAuthGuard, AdminGuard)
  deletePhone(@Param('id') id: number) { return this.commandBus.execute(new DeletePhoneCommand(+id)); }
}
