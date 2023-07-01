import { AuthService } from '@/auth/auth.service';
import { Logger } from '@nestjs/common';
import { isEmail } from 'class-validator';
import {
  CommandRunner,
  InquirerService,
  Question,
  QuestionSet,
  Command,
  Option,
  ValidateFor,
} from 'nest-commander';

@QuestionSet({ name: 'user' })
export class RegisterCommandQuestions {
  @Question({
    type: 'input',
    name: 'email',
    message: 'Email',
    validate: (value: string) => {
      if (!isEmail(value)) {
        return 'Email must be a valid email address';
      }

      return true;
    },
  })
  public parseEmail(email: string): string {
    return email;
  }

  @Question({
    type: 'input',
    name: 'username',
    message: 'Username',
    validate: (value: string) => {
      if (value.length < 3) {
        return 'Username must be at least 3 characters long';
      }
      if (value.length > 100) {
        return 'Username must be less than 100 characters long';
      }

      return true;
    },
  })
  public parseUsername(username: string): string {
    return username;
  }

  @Question({
    type: 'password',
    name: 'password',
    message: 'Password',
    validate: (value: string) => {
      if (value.length < 8) {
        return 'Password must be at least 8 characters long';
      }
      if (value.length > 100) {
        return 'Password must be less than 100 characters long';
      }

      return true;
    },
  })
  public parsePassword(password: string): string {
    return password;
  }

  @Question({
    type: 'confirm',
    name: 'admin',
    message: 'Is this user an admin?',
  })
  public parseAdmin(admin: boolean): boolean {
    return admin;
  }
}

@Command({
  name: 'user:register',
  description: 'Register a new user',
})
export class RegisterCommand extends CommandRunner {
  public constructor(
    private readonly authService: AuthService,
    private readonly inquirer: InquirerService,
  ) {
    super();
  }

  public async run(
    params: string[],
    options?: {
      username?: string;
      email?: string;
      password?: string;
      admin?: boolean;
    },
  ): Promise<void> {
    try {
      const answers = await this.inquirer.prompt('user', options);

      await this.authService.register({
        username: answers.username,
        password: answers.password,
        email: answers.email,
      });

      console.log(`Registered user ${answers.username}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error: [%s] ', error.name, error.message);
      } else {
        console.error(error);
      }
    }
  }

  @Option({
    name: 'username',
    flags: '-u, --username <username>',
    description: 'The username of the user to register',
  })
  public parseUsername(username: string): string {
    return username;
  }

  @ValidateFor({
    name: 'username',
  })
  public validateUsername(value: string) {
    if (value.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    if (value.length > 100) {
      return 'Username must be less than 100 characters long';
    }

    return true;
  }

  @Option({
    name: 'email',
    flags: '-e, --email <email>',
    description: 'The email address of the user to register',
  })
  public parseEmail(email: string): string {
    return email;
  }

  @ValidateFor({
    name: 'email',
  })
  public validateEmail(value: string) {
    if (!isEmail(value)) {
      return 'Email must be a valid email address';
    }

    return true;
  }

  @Option({
    name: 'password',
    flags: '-p, --password <password>',
    description: 'The password of the user to register',
  })
  public parsePassword(password: string): string {
    return password;
  }

  @ValidateFor({
    name: 'password',
  })
  public validatePassword(value: string) {
    if (value.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (value.length > 100) {
      return 'Password must be less than 100 characters long';
    }

    return true;
  }

  @Option({
    name: 'admin',
    flags: '-a, --admin',
    description: 'Whether the user is an admin',
  })
  public parseAdmin(admin: boolean): boolean {
    return admin;
  }
}
