import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './CreateUser.dto';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: number;
}
