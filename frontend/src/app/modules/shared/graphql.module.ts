import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {
  InjectionToken,
  NgModule,
  TransferState,
  makeStateKey,
} from '@angular/core';
import {
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@/environments/environment';

const APOLLO_CACHE = new InjectionToken<InMemoryCache>('apollo-cache');
const STATE_KEY = makeStateKey<NormalizedCacheObject>('apollo.state');

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_CACHE,
      useValue: new InMemoryCache(),
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory(
        httpLink: HttpLink,
        cache: InMemoryCache,
        transferState: TransferState
      ): ApolloClientOptions<unknown> {
        const isBrowser = transferState.hasKey(STATE_KEY);

        if (isBrowser) {
          const state = transferState.get(STATE_KEY, null);
          if (state) {
            cache.restore(state);
          }
        } else {
          transferState.onSerialize(STATE_KEY, () => {
            return cache.extract();
          });
          // Reset cache after extraction to avoid sharing between requests
          void cache.reset();
        }

        return {
          link: httpLink.create({
            uri: environment.api,
            withCredentials: true,
          }),
          ssrMode: !isBrowser,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink, APOLLO_CACHE, TransferState],
    },
  ],
})
export class GraphQLModule {}
