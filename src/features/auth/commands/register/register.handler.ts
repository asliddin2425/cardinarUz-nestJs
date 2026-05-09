import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterCommand } from './register.command';
import { User } from '../../../users/user.entity';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ dto }: RegisterCommand) {
    const existing = await this.userRepo.findOne({
      where: [{ email: dto.email }, { phoneNumber: dto.phoneNumber }],
    });

    if (existing) {
      throw new ConflictException('Bu email yoki telefon raqam allaqachon ro\'yxatdan o\'tgan');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      fullName: dto.fullName,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      password: hashedPassword,
    });

    await this.userRepo.save(user);

    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
      },
      accessToken: token,
    };
  }
}
