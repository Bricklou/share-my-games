import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  @Min(0)
  public page = 1;

  @Field(() => Int, { nullable: true })
  @Min(1)
  public limit = 10;
}
