// import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// import { CommandBus } from '@nestjs/cqrs';
// import { RegisterDto } from './commands/register/register.dto';
// import { LoginDto } from './commands/login/login.dto';
// import { RegisterCommand } from './commands/register/register.command';
// import { LoginCommand } from './commands/login/login.command';
// import { JwtAuthGuard } from '../../shared/guards/auth.guard';
// import { CurrentUser } from '../../shared/decorators/current-user.decorator';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags("Auth")
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly commandBus: CommandBus) {}

//   @Post('register')
//   register(@Body() dto: RegisterDto) {
//     return this.commandBus.execute(new RegisterCommand(dto));
//   }

//   @Post('login')
//   login(@Body() dto: LoginDto) {
//     return this.commandBus.execute(new LoginCommand(dto));
//   }

//   @Get('me')
//   @UseGuards(JwtAuthGuard)
//   me(@CurrentUser() user: any) {
//     return user;
//   }
// }

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './commands/register/register.dto';
import { LoginDto } from './commands/login/login.dto';
import { RegisterCommand } from './commands/register/register.command';
import { LoginCommand } from './commands/login/login.command';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  @ApiOperation({ summary: 'Ro\'yxatdan o\'tish' })
  register(@Body() dto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(dto));
  }

  @Post('login')
  @ApiOperation({ summary: 'Tizimga kirish' })
  login(@Body() dto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(dto));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Mening profilim' })
  me(@CurrentUser() user: any) {
    return user;
  }
}
