import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateBranchCommand } from './update-branch.command';
import { Branch } from '../../branch.entity';

@CommandHandler(UpdateBranchCommand)
export class UpdateBranchHandler implements ICommandHandler<UpdateBranchCommand> {
  constructor(@InjectRepository(Branch) private repo: Repository<Branch>) {}
  async execute({ id, dto }: UpdateBranchCommand) {
    const branch = await this.repo.findOne({ where: { id } });
    if (!branch) throw new NotFoundException('Filial topilmadi');
    Object.assign(branch, dto);
    return this.repo.save(branch);
  }
}
