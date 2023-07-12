import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class PaginatedUser {
  @Field(() => [User])
  public data: User[];

  @Field(() => Int)
  public total: number;

  @Field(() => Int)
  public current: number;

  @Field(() => Int)
  public limit: number;
}
