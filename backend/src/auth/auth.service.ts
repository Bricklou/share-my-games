import {
  Injectable,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { LoginInput } from '@/auth/dto/login.input';
import { RegisterInput } from '@/auth/dto/register.input';
import { Request, Response } from 'express';
import { User } from '@/user/models/user.model';
import { validate } from 'class-validator';

interface AuthResponse {
  user: User;
  token: number;
}

@Injectable()
export class AuthService {
  private static COOKIE_NAME = 'user-session';

  public constructor(private userService: UserService) {}

  public async login(loginInput: LoginInput): Promise<AuthResponse> {
    // Find the user
    const user = await this.userService.findOneBy({ email: loginInput.email });

    // If the user doesn't exist, throw an error
    if (!user) {
      throw new UnauthorizedException(loginInput);
    }

    // Verify the password
    const valid = await this.userService.comparePassword(
      user,
      loginInput.password,
    );

    // If the password is invalid, throw an error
    if (!valid) {
      throw new UnauthorizedException(loginInput);
    }

    // Return the user
    return {
      user,
      token: user.id,
    };
  }

  @UsePipes(new ValidationPipe())
  public async register(registerInput: RegisterInput): Promise<AuthResponse> {
    await validate(registerInput);

    // Create and return the user
    const user = await this.userService.create(registerInput);

    return {
      user,
      token: user.id,
    };
  }

  public async logout(request: Request): Promise<boolean> {
    const result = await new Promise<boolean>((resolve) => {
      request.session.destroy((error) => {
        if (error) {
          resolve(false);
        }

        resolve(true);
      });
    });

    return result;
  }

  public async restoreSessionFromRequest(
    request: Request,
  ): Promise<User | undefined> {
    const userId = request?.session[AuthService.COOKIE_NAME];

    if (!userId) {
      return undefined;
    }

    try {
      return await this.userService.findOneBy({ id: userId });
    } catch (error) {
      return undefined;
    }
  }

  public configureCookie(
    request: Request,
    token: number,
    remember = false,
  ): void {
    request.session.cookie.maxAge = remember ? 30 * 24 * 60 * 60 * 1000 : 0;
    request.session[AuthService.COOKIE_NAME] = token;
  }

  public async me(request: Request): Promise<User> {
    const user = await this.restoreSessionFromRequest(request);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
