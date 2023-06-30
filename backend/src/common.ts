import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const commonModules: (
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] = [
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
];
