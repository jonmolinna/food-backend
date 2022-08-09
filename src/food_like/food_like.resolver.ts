import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
} from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { Food } from 'src/foods/entity/food.entity';
import { User } from 'src/users/entity/user.entity';
import { FoodLike } from './entity/food_like.entity';
import { FoodLikeService } from './food_like.service';

@Resolver(() => FoodLike)
export class FoodLikeResolver {
  constructor(private foodLikeService: FoodLikeService) {}

  @Query(() => [FoodLike])
  @UseGuards(JwtAuthGuard)
  likeFoodByUser(@Context() context): Promise<FoodLike[]> {
    const { userId } = context.req.user;
    return this.foodLikeService.findAllLikesFoodByUser(userId);
  }

  @Mutation(() => FoodLike)
  @UseGuards(JwtAuthGuard)
  addLikeFoodByUser(
    @Args('idFood', { type: () => ID }) idFood: number,
    @Context() context,
  ) {
    const { userId } = context.req.user;
    return this.foodLikeService.addLikeFoodByUser({
      userId: userId,
      foodId: idFood,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  deleteLikeFoodByUser(
    @Args('idFoodLike', { type: () => ID }) idFoodLike: number,
    @Context() context,
  ) {
    const { userId } = context.req.user;
    return this.foodLikeService.deleteLikeFoodByUser(idFoodLike, userId);
  }

  // Parent
  @ResolveField(() => Food)
  food(@Parent() foodLike: FoodLike): Promise<Food> {
    return this.foodLikeService.getFood(foodLike.foodId);
  }

  @ResolveField(() => User)
  user(@Parent() foodLike: FoodLike): Promise<User> {
    return this.foodLikeService.getUser(foodLike.userId);
  }
}
