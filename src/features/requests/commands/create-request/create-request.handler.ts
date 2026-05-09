import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestCommand } from './create-request.command';
import { Request } from '../../request.entity';

@CommandHandler(CreateRequestCommand)
export class CreateRequestHandler implements ICommandHandler<CreateRequestCommand> {
  constructor(@InjectRepository(Request) private repo: Repository<Request>) {}
  execute({ dto, userId }: CreateRequestCommand) {
    return this.repo.save(this.repo.create({ ...dto, userId: userId || null }));
  }
}
