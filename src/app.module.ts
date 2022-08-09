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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'molina125',
      database: 'food_db',
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    FoodsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    FoodLikeModule,
  ],
})
export class AppModule {}
