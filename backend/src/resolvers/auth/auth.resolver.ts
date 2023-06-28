import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/services/auth/auth.service';
import { LoginInput, RegisterInput } from 'src/typings/graphql';

@Resolver()
export class AuthResolver {
  public constructor(private authService: AuthService) {}

  @Query('login')
  public async login(@Args('input') input: LoginInput) {
    const user = await this.authService.login(input.email, input.password);

    return user;
  }

  @Query('register')
  public async register(@Args('input') input: RegisterInput) {
    const user = await this.authService.register(
      input.username,
      input.email,
      input.password,
    );

    return user;
  }
}
