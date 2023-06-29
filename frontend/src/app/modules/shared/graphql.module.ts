import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@/environments/environment';

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink): ApolloClientOptions<unknown> {
        return {
          link: httpLink.create({
            uri: environment.api,
            withCredentials: true,
          }),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
