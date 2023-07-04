import { Module } from '@nestjs/common';
import { GraphqlConfigModule } from './graphql.module';
import { commonModules } from './common';

@Module({
  imports: [...commonModules, GraphqlConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
