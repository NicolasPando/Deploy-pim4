import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { CategoriesModule } from './Categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { config as dotenvConfig} from 'dotenv';
import { CategoriesRepository } from './Categories/categories.repository';
import { ProductsRepository } from './Products/products.repository';
import { product } from './Entities/product.entity';
import { category } from './Entities/category.entity';
import { OrdersRepository } from './orders/orders.repository';
import { order } from './Entities/order.entity';
import { orderdetail } from './Entities/order-detail.entity';
import { UsersRepository } from './Users/users.repository';
import { users } from './Entities/user.entity';
dotenvConfig({path:'.env'});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService], 
      useFactory:(ConfigService:ConfigService) => ConfigService.get('typeorm')
  }),
    UsersModule, ProductsModule, AuthModule, CategoriesModule, OrdersModule, FileUploadModule, JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRETWORD,
      signOptions:{expiresIn:'60m'}
    }),
    TypeOrmModule.forFeature([product, category, order, orderdetail, users])],
  controllers: [AppController],
  providers: [AppService,CategoriesRepository,ProductsRepository,OrdersRepository, UsersRepository],
})
export class AppModule {}
