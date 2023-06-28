/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginInput {
  email: string;
  password: string;
}

export class RegisterInput {
  username: string;
  email: string;
  password: string;
}

export abstract class IQuery {
  abstract login(
    input: LoginInput,
  ): Nullable<string> | Promise<Nullable<string>>;
  abstract register(
    input: RegisterInput,
  ): Nullable<string> | Promise<Nullable<string>>;
  abstract user(id: number): User | Promise<User>;
  abstract users(): User[] | Promise<User[]>;
}

export class User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

type Nullable<T> = T | null;
