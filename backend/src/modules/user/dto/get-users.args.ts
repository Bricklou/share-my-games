import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetUsersArgs {
  @Field(() => Int, { nullable: true })
  public skip?: number;

  @Field(() => Int, { nullable: true })
  public take?: number;
}
