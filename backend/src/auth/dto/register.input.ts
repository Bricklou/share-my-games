import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, IsStrongPassword } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  public email: string;

  @Field()
  @IsAlphanumeric()
  public username: string;

  @Field()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;
}
