import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DeleteBannerCommand } from './delete-banner.command';
import { Banner } from '../../banner.entity';

@CommandHandler(DeleteBannerCommand)
export class DeleteBannerHandler implements ICommandHandler<DeleteBannerCommand> {
  constructor(@InjectRepository(Banner) private repo: Repository<Banner>) {}
  async execute({ id }: DeleteBannerCommand) {
    const banner = await this.repo.findOne({ where: { id } });
    if (!banner) throw new NotFoundException('Banner topilmadi');
    await this.repo.remove(banner);
    return { message: 'O\'chirildi' };
  }
}
