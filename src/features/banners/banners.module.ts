import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannersController } from './banners.controller';
import { Banner } from './banner.entity';
import { GetBannersHandler } from './queries/get-banners/get-banners.handler';
import { CreateBannerHandler } from './commands/create-banner/create-banner.handler';
import { UpdateBannerHandler } from './commands/update-banner/update-banner.handler';
import { DeleteBannerHandler } from './commands/delete-banner/delete-banner.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Banner])],
  controllers: [BannersController],
  providers: [GetBannersHandler, CreateBannerHandler, UpdateBannerHandler, DeleteBannerHandler],
})
export class BannersModule {}
