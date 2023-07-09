import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Website statistics object' })
export class StatsResponse {
  @Field(() => Int, {
    description: 'Total number of users registered on the website',
  })
  public users: number;

  @Field(() => Int, {
    description: 'Total number of roles created on the website',
  })
  public roles: number;

  @Field(() => Int, {
    description: 'Total number of games added to the website',
  })
  public games: number;

  @Field(() => Int, {
    description: 'Total number of creators  added to the website',
  })
  public creators: number;

  @Field(() => Int, {
    description: 'Total number of tags  added to the website',
  })
  public tags: number;
}
