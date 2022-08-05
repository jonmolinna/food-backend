import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/CreateCategory.dto';
import { UpdateCategoryInput } from './dto/UpdateCategory.dto';
import { Category } from './entity/category.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private categoryService: CategoriesService) {}

  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryInput);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.updateCategory(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Boolean)
  deleteCategory(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }
}
