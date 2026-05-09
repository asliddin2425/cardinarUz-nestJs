import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBannerCommand } from './create-banner.command';
import { Banner } from '../../banner.entity';

@CommandHandler(CreateBannerCommand)
export class CreateBannerHandler implements ICommandHandler<CreateBannerCommand> {
  constructor(@InjectRepository(Banner) private repo: Repository<Banner>) {}
  execute({ dto }: CreateBannerCommand) { return this.repo.save(this.repo.create(dto)); }
}
