import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@/user/models/user.model';
import { LoginInput } from '@/auth/dto/login.input';
import { RegisterInput } from '@/auth/dto/register.input';
import { AuthService } from '@/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { GuestGuard } from '@/auth/guards/guest.guard';
import { Request } from 'express';

@Resolver()
export class AuthResolver {
  public constructor(private authService: AuthService) {}
  @Mutation(() => User)
  @UseGuards(GuestGuard)
  public async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context('req') request: Request,
  ): Promise<User> {
    const { user, token } = await this.authService.login(loginInput);
    this.authService.configureCookie(request, token);

    return user;
  }

  @Mutation(() => User)
  @UseGuards(GuestGuard)
  public async register(
    @Args('registerInput') registerInput: RegisterInput,
    @Context('req') request: Request,
  ): Promise<User> {
    const { user, token } = await this.authService.register(registerInput);
    this.authService.configureCookie(request, token);

    return user;
  }

  // TODO: add the logout mutation
}
