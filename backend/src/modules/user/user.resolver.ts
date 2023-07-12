import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { User } from './models/user.model';
import { GetUsersArgs } from './dto/get-users.args';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PaginatedUser } from './models/paginated-users.model';

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  // Get one user by id
  @Query(() => User)
  @UseGuards(AuthGuard)
  public async getUser(@Args('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(id);

    return user;
  }

  // Get all users
  @Query(() => PaginatedUser)
  @UseGuards(AuthGuard)
  public async getUsers(@Args() args?: GetUsersArgs): Promise<PaginatedUser> {
    const data = await this.userService.paginate(args);

    return data;
  }
}
