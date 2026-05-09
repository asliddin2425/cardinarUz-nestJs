// import { Module } from '@nestjs/common';
// import { CqrsModule } from '@nestjs/cqrs';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';
// import { RegisterHandler } from './commands/register/register.handler';
// import { LoginHandler } from './commands/login/login.handler';
// import { User } from '../users/user.entity';

// const CommandHandlers = [RegisterHandler, LoginHandler];

// @Module({
//   imports: [
//     CqrsModule,
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_ACCESS_SECRET || 'secret',
//       signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
//     }),
//     TypeOrmModule.forFeature([User]),
//   ],
//   controllers: [AuthController],
//   providers: [JwtStrategy, ...CommandHandlers],
//   exports: [JwtModule],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { RegisterHandler } from './commands/register/register.handler';
import { LoginHandler } from './commands/login/login.handler';

import { User } from '../users/user.entity';

const CommandHandlers = [RegisterHandler, LoginHandler];

@Module({
  imports: [
    CqrsModule,

    // 🔥 Passport JWT setup (MUHIM)
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // 🔥 JWT CONFIG
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRES,
      },
    }),

    TypeOrmModule.forFeature([User]),
  ],

  controllers: [AuthController],

  providers: [
    JwtStrategy,
    ...CommandHandlers,
  ],

  exports: [
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}