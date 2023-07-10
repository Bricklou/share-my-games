import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Provider,
  TransferState,
  isDevMode,
  makeStateKey,
} from '@angular/core';
import {
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { HttpDebugInterceptor } from '@app/interceptors/http-debug.interceptor';
import { HttpApiInterceptor } from '@app/interceptors/http-api.interceptor';

const APOLLO_CACHE = new InjectionToken<InMemoryCache>('apollo-cache');
const STATE_KEY = makeStateKey<NormalizedCacheObject>('apollo.state');

const providers: Provider[] = [
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
        cache,
      };
    },
    deps: [HttpLink, APOLLO_CACHE, TransferState],
  },
  { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true },
];

if (isDevMode()) {
  providers.push({
    provide: HTTP_INTERCEPTORS,
    useClass: HttpDebugInterceptor,
    multi: true,
  });
}// WARNING: To make sure that the service are properly loaded, don't forget to add them in the constructor of the AppModule

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  exports: [ApolloModule, HttpClientModule],
})
export class GraphQLModule {
  public static forRoot(): ModuleWithProviders<GraphQLModule> {
    return {
      ngModule: GraphQLModule,
      providers,
    };
  }
}
