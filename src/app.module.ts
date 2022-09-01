import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FoodsModule } from './foods/foods.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FoodLikeModule } from './food_like/food_like.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from './config/constants';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>(DB_HOST),
        port: parseInt(config.get<string>(DB_PORT), 10),
        username: config.get<string>(DB_USERNAME),
        password: config.get<string>(DB_PASSWORD),
        database: config.get<string>(DB_DATABASE),
        entities: ['dist/**/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    FoodsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    FoodLikeModule,
  ],
})
export class AppModule {}
