import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { LoginInput } from '@/auth/dto/login.input';
import { RegisterInput } from '@/auth/dto/register.input';
import { Request } from 'express';
import { User } from '@/user/models/user.model';

interface AuthResponse {
  user: User;
  token: string;
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
      token: 'token',
    };
  }

  public async register(registerInput: RegisterInput): Promise<AuthResponse> {
    // Create and return the user
    const user = await this.userService.create(registerInput);

    return {
      user,
      token: 'token',
    };
  }

  public async restoreSessionFromRequest(
    request: Request,
  ): Promise<User | undefined> {
    const userId = request.session[AuthService.COOKIE_NAME];

    if (!userId) {
      return undefined;
    }

    try {
      return await this.userService.findOneBy({ id: userId });
    } catch (error) {
      return undefined;
    }
  }

  public configureCookie(request: Record<string, any>, token: string): void {
    request.session[AuthService.COOKIE_NAME] = token;
  }
}
