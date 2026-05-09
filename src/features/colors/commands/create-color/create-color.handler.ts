import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { CreateColorCommand } from './create-color.command';
import { Color } from '../../color.entity';

@CommandHandler(CreateColorCommand)
export class CreateColorHandler implements ICommandHandler<CreateColorCommand> {
  constructor(@InjectRepository(Color) private repo: Repository<Color>) {}
  async execute({ dto }: CreateColorCommand) {
    const exists = await this.repo.findOne({ where: [{ title: dto.title }, { color: dto.color }] });
    if (exists) throw new ConflictException('Bu rang allaqachon mavjud');
    return this.repo.save(this.repo.create(dto));
  }
}
