import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';
import { User } from './models/user.model';
import { GetUsersArgs } from './dto/get-users.args';

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  // Get one user by id
  @Query(() => User)
  public async getUser(@Args('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(id);

    return user;
  }

  // Get all users
  @Query(() => [User])
  public async getUsers(@Args() args: GetUsersArgs): Promise<User[]> {
    return this.userService.findAll(args);
  }
}
