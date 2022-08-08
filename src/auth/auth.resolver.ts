import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/LoginResponse.dto';
import { LoginUserInput } from './dto/LoginUser.dto';
import { GqlAuthGuard } from './guards/gqlAuth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    // req.user = express
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
}
