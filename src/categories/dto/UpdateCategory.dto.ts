import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateCategoryInput } from './CreateCategory.dto';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => ID)
  id: number;
}
