import { Module } from '@nestjs/common';
import { commonModules } from './common';
import { NestTypeOrmCommandsModule } from 'nestjs-typeorm-commands';
import { join } from 'path';

@Module({
  imports: [
    ...commonModules,
    NestTypeOrmCommandsModule.forRoot({
      migrationsDir: join(__dirname, 'migrations'),
    }),
  ],
})
export class CliModule {}
