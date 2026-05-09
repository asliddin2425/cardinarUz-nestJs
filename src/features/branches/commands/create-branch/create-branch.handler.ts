import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBranchCommand } from './create-branch.command';
import { Branch } from '../../branch.entity';

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler implements ICommandHandler<CreateBranchCommand> {
  constructor(@InjectRepository(Branch) private repo: Repository<Branch>) {}
  execute({ dto }: CreateBranchCommand) { return this.repo.save(this.repo.create(dto)); }
}
