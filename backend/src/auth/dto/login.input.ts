import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field({ description: 'Email address' })
  @IsEmail({}, { message: 'Invalid email address' })
  public email: string;

  @Field({ description: 'Password' })
  @IsString({ message: 'Password must be a string' })
  public password: string;

  @Field({ nullable: true })
  public remember?: boolean;
}
