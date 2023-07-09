import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@m/user/models/user.model';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GuestGuard } from './guards/guest.guard';
import { Request } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Resolver(() => User)
export class AuthResolver {
  public constructor(private authService: AuthService) {}

  @Mutation(() => User)
  @UseGuards(GuestGuard)
  public async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context('req') request: Request,
  ): Promise<User> {
    const { user, token } = await this.authService.login(loginInput);
    this.authService.configureCookie(request, token, loginInput.remember);
    return user;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  public async logout(@Context('req') request: Request): Promise<boolean> {
    return await this.authService.logout(request);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  public async me(@Context('req') request: Request): Promise<User> {
    return await this.authService.me(request);
  }
}
