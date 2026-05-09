import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { ProductsModule } from './features/products/products.module';
import { CategoriesModule } from './features/categories/categories.module';
import { ColorsModule } from './features/colors/colors.module';
import { CarsModule } from './features/cars/cars.module';
import { ArticulsModule } from './features/articuls/articuls.module';
import { MaterialsModule } from './features/materials/materials.module';
import { CartModule } from './features/cart/cart.module';
import { OrdersModule } from './features/orders/orders.module';
import { CustomProductsModule } from './features/custom-products/custom-products.module';
import { BranchesModule } from './features/branches/branches.module';
import { BannersModule } from './features/banners/banners.module';
import { StaticInfoModule } from './features/static-info/static-info.module';
import { RequestsModule } from './features/requests/requests.module';
import { SocialsModule } from './features/socials/socials.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // dev da true, prod da false
      }),
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ColorsModule,
    CarsModule,
    ArticulsModule,
    MaterialsModule,
    CartModule,
    OrdersModule,
    CustomProductsModule,
    BranchesModule,
    BannersModule,
    StaticInfoModule,
    RequestsModule,
    SocialsModule,
    PassportModule
  ],
})
export class AppModule {}
