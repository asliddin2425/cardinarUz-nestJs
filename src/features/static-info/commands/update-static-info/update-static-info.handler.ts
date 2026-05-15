// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UpdateStaticInfoCommand } from './update-static-info.command';
// import { StaticInfo } from '../../static-info.entity';

// @CommandHandler(UpdateStaticInfoCommand)
// export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoCommand> {
//   constructor(@InjectRepository(StaticInfo) private repo: Repository<StaticInfo>) {}
//   async execute({ dto }: UpdateStaticInfoCommand) {
//     let info = await this.repo.findOne({ where: { id: 1 } });
//     if (!info) {
//       info = this.repo.create({ id: 1, ...dto });
//     } else {
//       Object.assign(info, dto);
//     }
//     return this.repo.save(info);
//   }
// }

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateStaticInfoCommand } from './update-static-info.command';
import { StaticInfo } from '@features/static-info/static-info.entity';
import { UpdateStaticInfoResponse } from './update-static-info.response';

@CommandHandler(UpdateStaticInfoCommand)
export class UpdateStaticInfoHandler
  implements ICommandHandler<UpdateStaticInfoCommand>
{
  constructor(
    @InjectRepository(StaticInfo)
    private readonly repo: Repository<StaticInfo>,
  ) {}

  async execute(
    command: UpdateStaticInfoCommand,
  ): Promise<UpdateStaticInfoResponse> {
    const info = await this.repo.findOne({ where: { id: 1 } });
    if (!info) {
      throw new NotFoundException(
        'StaticInfo record not found. Run seed first.',
      );
    }

    if (command.address      !== undefined) info.address      = command.address;
    if (command.phoneNumber  !== undefined) info.phoneNumber  = command.phoneNumber;
    if (command.workingHours !== undefined) info.workingHours = command.workingHours;
    if (command.email        !== undefined) info.email        = command.email;

    const saved = await this.repo.save(info);
    return new UpdateStaticInfoResponse(saved);
  }
}