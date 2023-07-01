import { IsAlphanumeric, IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterInput {
  @IsEmail()
  public email: string;

  @IsAlphanumeric()
  public username: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;
}
