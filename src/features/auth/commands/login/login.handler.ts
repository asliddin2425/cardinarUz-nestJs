// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UnauthorizedException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { LoginCommand } from './login.command';
// import { User } from '../../../users/user.entity';

// @CommandHandler(LoginCommand)
// export class LoginHandler implements ICommandHandler<LoginCommand> {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepo: Repository<User>,
//     private readonly jwtService: JwtService,
//   ) {}

//   async execute({ dto }: LoginCommand) {
//     const user = await this.userRepo.findOne({
//       where: { email: dto.email },
//       select: ['id', 'fullName', 'email', 'phoneNumber', 'password', 'isAdmin'],
//     });

//     if (!user) {
//       throw new UnauthorizedException('Email yoki parol noto\'g\'ri');
//     }

//     const isMatch = await bcrypt.compare(dto.password, user.password);
//     if (!isMatch) {
//       throw new UnauthorizedException('Email yoki parol noto\'g\'ri');
//     }

//     const token = this.jwtService.sign({ sub: user.id, email: user.email });

//     return {
//       user: {
//         id: user.id,
//         fullName: user.fullName,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         isAdmin: user.isAdmin,
//       },
//       accessToken: token,
//     };
//   }
// }

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginCommand } from './login.command';
import { User } from '../../../users/user.entity';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ dto }: LoginCommand) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
      select: [
        'id',
        'fullName',
        'email',
        'phoneNumber',
        'password',
        'isAdmin',
      ],
    });

    if (!user) {
      throw new UnauthorizedException('Email yoki parol noto‘g‘ri');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email yoki parol noto‘g‘ri');
    }

    // 🔥 JWT TOKEN (TO‘G‘RI VERSION)
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES,
      },
    );

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
      },
      accessToken,
    };
  }
}