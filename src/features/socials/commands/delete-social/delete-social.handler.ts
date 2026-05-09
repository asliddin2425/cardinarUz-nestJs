import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DeleteSocialCommand } from './delete-social.command';
import { SocialLink } from '../../social-link.entity';

@CommandHandler(DeleteSocialCommand)
export class DeleteSocialHandler implements ICommandHandler<DeleteSocialCommand> {
  constructor(@InjectRepository(SocialLink) private repo: Repository<SocialLink>) {}
  async execute({ id }: DeleteSocialCommand) {
    const social = await this.repo.findOne({ where: { id } });
    if (!social) throw new NotFoundException('Topilmadi');
    await this.repo.remove(social);
    return { message: 'O\'chirildi' };
  }
}
