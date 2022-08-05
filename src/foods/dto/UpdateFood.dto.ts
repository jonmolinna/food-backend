import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateFoodInput } from './CreateFood.dto';

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field(() => ID)
  id: number;
}
