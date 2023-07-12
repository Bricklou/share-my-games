import { OrderDirection } from '@/graphql/enum';
import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from './pagination.args';
import { IsEnum } from 'class-validator';

@ArgsType()
export class GetUsersArgs extends PaginationArgs {
  @Field({ nullable: true, defaultValue: 'username' })
  @IsEnum(['id', 'username', 'email', 'createdAt'])
  public sortBy: string;

  @Field(() => OrderDirection, { nullable: true, defaultValue: 'asc' })
  @IsEnum(OrderDirection)
  public sortDirection: OrderDirection;
}
