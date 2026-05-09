import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DeletePhoneCommand } from './delete-phone.command';
import { PhoneNumber } from '../../phone-number.entity';

@CommandHandler(DeletePhoneCommand)
export class DeletePhoneHandler implements ICommandHandler<DeletePhoneCommand> {
  constructor(@InjectRepository(PhoneNumber) private repo: Repository<PhoneNumber>) {}
  async execute({ id }: DeletePhoneCommand) {
    const phone = await this.repo.findOne({ where: { id } });
    if (!phone) throw new NotFoundException('Topilmadi');
    await this.repo.remove(phone);
    return { message: 'O\'chirildi' };
  }
}
