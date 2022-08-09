import { Module } from '@nestjs/common';
import { FoodLikeService } from './food_like.service';
import { FoodLikeResolver } from './food_like.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodLike } from './entity/food_like.entity';
import { FoodsModule } from 'src/foods/foods.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [FoodLikeService, FoodLikeResolver],
  imports: [TypeOrmModule.forFeature([FoodLike]), FoodsModule, UsersModule],
})
export class FoodLikeModule {}
