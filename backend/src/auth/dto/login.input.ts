import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  public email: string;

  @Field()
  public password: string;

  @Field({ nullable: true })
  public remember?: boolean;
}
