import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateBannerCommand } from './update-banner.command';
import { Banner } from '../../banner.entity';

@CommandHandler(UpdateBannerCommand)
export class UpdateBannerHandler implements ICommandHandler<UpdateBannerCommand> {
  constructor(@InjectRepository(Banner) private repo: Repository<Banner>) {}
  async execute({ id, dto }: UpdateBannerCommand) {
    const banner = await this.repo.findOne({ where: { id } });
    if (!banner) throw new NotFoundException('Banner topilmadi');
    Object.assign(banner, dto);
    return this.repo.save(banner);
  }
}
