import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetUsersArgs {
  @Field(() => Int)
  public skip?: number;

  @Field(() => Int)
  public take?: number;
}
