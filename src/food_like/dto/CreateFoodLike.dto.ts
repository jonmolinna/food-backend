import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFoodLikeInput {
  @IsNotEmpty()
  @Field(() => ID)
  userId: number;

  @IsNotEmpty()
  @Field(() => ID)
  foodId: number;
}
