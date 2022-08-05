import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFoodInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @IsNotEmpty()
  @Field()
  imagen: string;

  @IsNotEmpty()
  @Field(() => Float)
  price: number;

  @IsNotEmpty()
  @Field(() => ID)
  categoryId: number;
}
