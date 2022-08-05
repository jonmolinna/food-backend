import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { Category } from 'src/categories/entity/category.entity';
import { CreateFoodInput } from './dto/CreateFood.dto';
import { UpdateFoodInput } from './dto/UpdateFood.dto';
import { Food } from './entity/food.entity';
import { FoodsService } from './foods.service';

@Resolver(() => Food)
export class FoodsResolver {
  constructor(private foodService: FoodsService) {}

  @Query(() => [Food])
  foods(): Promise<Food[]> {
    return this.foodService.findAllFood();
  }

  @Query(() => Food, { nullable: true })
  food(@Args('id', { type: () => ID }) id: number): Promise<Food> {
    return this.foodService.getFoodById(id);
  }

  @Mutation(() => Food)
  createFood(
    @Args('createFoodInput') createFoodInput: CreateFoodInput,
  ): Promise<Food> {
    return this.foodService.createFood(createFoodInput);
  }

  @Mutation(() => Food)
  updateFood(
    @Args('updateFoodInput') updateFoodInput: UpdateFoodInput,
  ): Promise<Food> {
    return this.foodService.updateFood(updateFoodInput.id, updateFoodInput);
  }

  @Mutation(() => Boolean)
  deleteFood(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.foodService.deleteFood(id);
  }

  // Parent
  @ResolveField(() => Category)
  category(@Parent() food: Food): Promise<Category> {
    return this.foodService.getCategory(food.categoryId);
  }
}
