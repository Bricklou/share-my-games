import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@/user/models/user.model';
import { LoginInput } from '@/auth/dto/login.input';
import { AuthService } from '@/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { GuestGuard } from '@/auth/guards/guest.guard';
import { Request, Response } from 'express';
import { AuthGuard } from '@/auth/guards/auth.guard';

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
    this.authService.configureCookie(request, token, loginInput.remember);
    return user;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  public async logout(@Context('req') request: Request): Promise<boolean> {
    return this.authService.logout(request);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  public async me(@Context('req') request: Request): Promise<User> {
    return this.authService.me(request);
  }
}
