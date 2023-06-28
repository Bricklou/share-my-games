import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from '@prisma/client';
import argon2 from 'argon2';

@Injectable()
export class AuthService {
  public constructor(private databaseService: DatabaseService) {}

  public async login(email: string, password: string): Promise<User> {
    // Find the user
    // Find the user
    const user = await this.databaseService.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // If the user doesn't exist, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // Verify the password
    const valid = await argon2.verify(user.password, password);

    // If the password is invalid, throw an error
    if (!valid) {
      throw new Error('Invalid password');
    }

    // Return the user
    return user;
  }

  public async register(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Create the user
    const user = await this.databaseService.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Return the user
    return user;
  }
}
