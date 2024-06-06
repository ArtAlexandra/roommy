import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ShopsModule } from './shops/shops.module';
import { TypeClothesModule } from './type-clothes/type-clothes.module';
import { GoodsModule } from './goods/goods.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: `.${process.env.NODE_ENV}.env`
    // }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345qwert',
        database: 'rommy',
        models: [User],
       autoLoadModels: true,
      
     // synchronize:true,
      
      
      }),
    UsersModule,
    ShopsModule,
    TypeClothesModule,
    GoodsModule
  ],
})
export class AppModule {}
