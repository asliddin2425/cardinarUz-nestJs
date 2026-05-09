import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSocialCommand } from './create-social.command';
import { SocialLink } from '../../social-link.entity';

@CommandHandler(CreateSocialCommand)
export class CreateSocialHandler implements ICommandHandler<CreateSocialCommand> {
  constructor(@InjectRepository(SocialLink) private repo: Repository<SocialLink>) {}
  execute({ dto }: CreateSocialCommand) { return this.repo.save(this.repo.create(dto)); }
}
