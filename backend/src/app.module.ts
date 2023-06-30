import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlConfigModule } from './graphql.module';
import { commonModules } from './common';

@Module({
  imports: [...commonModules, GraphqlConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
