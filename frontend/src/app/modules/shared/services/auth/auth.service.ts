import {
  Inject,
  Injectable,
  makeStateKey,
  Optional,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { Apollo } from 'apollo-angular';

import loginMutation from './login.graphql';
import logoutMutation from './logout.graphql';
import meQuery from './current-user.graphql';
import { isPlatformServer } from '@angular/common';
import { INIT_AUTH_USER } from '../../utils/init-auth.token';
import { ApolloError } from '@apollo/client/errors';

interface UserLoginInput {
  email: string;
  password: string;
  remember: boolean;
}

const STATE_USER = makeStateKey<User | undefined>('auth_user');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user: BehaviorSubject<User | undefined>;

  public constructor(
    private apollo: Apollo,
    private state: TransferState,
    // PlatformId
    @Inject(PLATFORM_ID) platformId: object,
    @Optional() @Inject(INIT_AUTH_USER) initAuthUser?: User
  ) {
    if (isPlatformServer(platformId)) {
      // If we are on the server, we need to set the user state to the initial user value
      this.state.set(STATE_USER, initAuthUser);
    } else {
      this.refreshSession();
    }

    this.user = new BehaviorSubject(this.state.get(STATE_USER, undefined));
  }

  public get userValue(): User | undefined {
    return this.user.value ?? this.state.get(STATE_USER, undefined);
  }

  public get isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map((user) => !!user));
  }

  private setUser(u: User | undefined): void {
    this.user.next(u);
    this.state.set(STATE_USER, u);
  }

  public login(data: UserLoginInput): Observable<boolean> {
    return this.apollo
      .mutate<User, { input: UserLoginInput }>({
        mutation: loginMutation,
        variables: { input: data },
      })
      .pipe(
        map((u) => {
          if (!u.data) return false;

          this.setUser(u.data);

          return true;
        })
      );
  }

  public logout(): Observable<boolean> {
    return this.apollo
      .mutate<boolean, void>({
        mutation: logoutMutation,
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map((u) => {
          if (u.data) {
            this.setUser(undefined);
            return true;
          }

          return false;
        })
      );
  }

  private refreshSession(): void {
    this.apollo
      .query<{ me: User }>({
        query: meQuery,
      })
      .subscribe({
        next: (u) => {
          if (u.data) {
            this.setUser(u.data.me);
          }
        },
        error: (error) => {
          if (error instanceof ApolloError) {
            this.setUser(undefined);
          }
        },
      });
  }
}