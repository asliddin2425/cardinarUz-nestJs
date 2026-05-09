import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { CreatePhoneCommand } from './create-phone.command';
import { PhoneNumber } from '../../phone-number.entity';

@CommandHandler(CreatePhoneCommand)
export class CreatePhoneHandler implements ICommandHandler<CreatePhoneCommand> {
  constructor(@InjectRepository(PhoneNumber) private repo: Repository<PhoneNumber>) {}
  async execute({ dto }: CreatePhoneCommand) {
    const exists = await this.repo.findOne({ where: { phoneNumber: dto.phoneNumber } });
    if (exists) throw new ConflictException('Bu raqam allaqachon mavjud');
    return this.repo.save(this.repo.create(dto));
  }
}
