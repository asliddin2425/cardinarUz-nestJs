import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialsController } from './socials.controller';
import { SocialLink } from './social-link.entity';
import { PhoneNumber } from './phone-number.entity';
import { GetSocialsHandler } from './queries/get-socials/get-socials.handler';
import { GetPhonesHandler } from './queries/get-phones/get-phones.handler';
import { CreateSocialHandler } from './commands/create-social/create-social.handler';
import { DeleteSocialHandler } from './commands/delete-social/delete-social.handler';
import { CreatePhoneHandler } from './commands/create-phone/create-phone.handler';
import { DeletePhoneHandler } from './commands/delete-phone/delete-phone.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([SocialLink, PhoneNumber])],
  controllers: [SocialsController],
  providers: [GetSocialsHandler, GetPhonesHandler, CreateSocialHandler, DeleteSocialHandler, CreatePhoneHandler, DeletePhoneHandler],
})
export class SocialsModule {}
