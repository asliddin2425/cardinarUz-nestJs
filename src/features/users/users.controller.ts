import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { GetUsersQuery } from './queries/get-users/get-users.query';
import { GetUserByIdQuery } from './queries/get-user-by-id/get-user-by-id.query';
import { UpdateUserCommand } from './commands/update-user/update-user.command';
import { UpdateUserDto } from './commands/update-user/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll(@Query() pagination: PaginationDto) {
    return this.queryBus.execute(new GetUsersQuery(pagination));
  }

  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetUserByIdQuery(+id));
  }

  @Patch('profile')
  updateProfile(@CurrentUser('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.commandBus.execute(new UpdateUserCommand(userId, dto));
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.commandBus.execute(new UpdateUserCommand(+id, dto));
  }
}
