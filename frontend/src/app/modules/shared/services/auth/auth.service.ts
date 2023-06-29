import {
  Inject,
  Injectable,
  InjectionToken,
  makeStateKey,
  Optional,
  TransferState,
} from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { User } from '../../interfaces/user';
import { Apollo } from 'apollo-angular';

import loginMutation from './login.graphql';

interface UserLoginInput {
  email: string;
  password: string;
}

export const INIT_AUTH = new InjectionToken<User>('init-auth.token');
const STATE_KEY_USER = makeStateKey<User | undefined>('auth_user');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User | undefined>;

  public readonly events: Observable<User | undefined>;

  public constructor(
    private apollo: Apollo,
    private state: TransferState,
    @Optional() @Inject(STATE_KEY_USER) private initAuth?: User
  ) {
    if (initAuth) {
      this.state.set(STATE_KEY_USER, initAuth);
    }

    this.user = new BehaviorSubject(this.state.get(STATE_KEY_USER, undefined));
    this.events = this.user.asObservable();
  }

  public get currentUser(): User | undefined {
    return this.user.value ?? this.state.get(STATE_KEY_USER, undefined);
  }

  public get isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map((user) => !!user));
  }

  private setUser(u: User | undefined): void {
    this.user.next(u);
    this.state.set(STATE_KEY_USER, u);
  }

  public login(data: UserLoginInput): Subscription {
    return this.apollo
      .mutate({ mutation: loginMutation, variables: data })
      .subscribe();
  }

  public logout(): void {
    // TODO: implement logout server and client side
  }
}
