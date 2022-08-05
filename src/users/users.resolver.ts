import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CreateUserInput } from './dto/CreateUser.dto';
import { UpdateUserInput } from './dto/UpdateUser.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAllUser();
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }
}
