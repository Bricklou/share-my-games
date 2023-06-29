import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphqlConfigModule } from './graphql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestTypeOrmCommandsModule } from 'nestjs-typeorm-commands';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    NestTypeOrmCommandsModule.forRoot({
      migrationsDir: join(__dirname, 'migrations'),
    }),
    GraphqlConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
