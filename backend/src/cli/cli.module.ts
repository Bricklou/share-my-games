import { Module } from '@nestjs/common';
import { commonModules } from '../common';
import { NestTypeOrmCommandsModule } from 'nestjs-typeorm-commands';
import { join } from 'path';
import {
  RegisterCommand,
  RegisterCommandQuestions,
} from './commands/register.command';
import { UserService } from '@m/user/user.service';
import { AuthService } from '@/modules/auth/auth.service';
import { User } from '@m/user/models/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ...commonModules,
    NestTypeOrmCommandsModule.forRoot({
      migrationsDir: join(__dirname, 'migrations'),
    }),

    TypeOrmModule.forFeature([User]),
  ],

  providers: [
    UserService,
    AuthService,

    RegisterCommand,
    RegisterCommandQuestions,
  ],
})
export class CliModule {}
