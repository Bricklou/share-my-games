import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/services/database/database.service';

@Resolver('User')
export class UsersResolver {
  public constructor(private databaseService: DatabaseService) {}

  @Query('user')
  public async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.databaseService.user.findFirst({
      where: { id },
    });
  }

  @Query('users')
  public async getUsers() {
    return this.databaseService.user.findMany();
  }
}
