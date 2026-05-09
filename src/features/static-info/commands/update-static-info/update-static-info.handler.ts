import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStaticInfoCommand } from './update-static-info.command';
import { StaticInfo } from '../../static-info.entity';

@CommandHandler(UpdateStaticInfoCommand)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoCommand> {
  constructor(@InjectRepository(StaticInfo) private repo: Repository<StaticInfo>) {}
  async execute({ dto }: UpdateStaticInfoCommand) {
    let info = await this.repo.findOne({ where: { id: 1 } });
    if (!info) {
      info = this.repo.create({ id: 1, ...dto });
    } else {
      Object.assign(info, dto);
    }
    return this.repo.save(info);
  }
}
