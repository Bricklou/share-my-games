import { DataSource } from '@angular/cdk/collections';
import { User } from '@app/modules/shared/interfaces/user';
import { Apollo } from 'apollo-angular';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  exhaustMap,
  map,
} from 'rxjs';
import listUsersQuery from './list-users.graphql';

export class UsersListDataSource extends DataSource<User> {
  protected data = new BehaviorSubject<User[]>([]);
  public readonly sortBy = new BehaviorSubject<keyof User>('username');
  public readonly sortDirection = new BehaviorSubject<'asc' | 'desc'>('asc');

  //private querySubscription: Subscription;
  private queryObservable: Observable<readonly User[]>;

  public constructor(private apolloClient: Apollo) {
    super();

    this.queryObservable = combineLatest({
      by: this.sortBy,
      direction: this.sortDirection,
    }).pipe(
      exhaustMap(({ by, direction }) =>
        this.apolloClient.query<{ getUsers: User[] }>({
          query: listUsersQuery,
          variables: {
            sortBy: by,
            sortDirection: direction,
          },
          fetchPolicy: 'network-only',
        })
      ),
      map(({ data }) => data.getUsers)
    );
  }

  public override connect(): Observable<readonly User[]> {
    return this.queryObservable;
  }

  public override disconnect(): void {
    this.sortDirection.unsubscribe();
    this.sortBy.unsubscribe();

    //this.querySubscription.unsubscribe();
  }

  public sort(sortBy: keyof User, sortDirection: 'asc' | 'desc' = 'asc'): void {
    this.sortBy.next(sortBy);
    this.sortDirection.next(sortDirection);
  }

  public toggleDirection(): void {
    this.sortDirection.next(
      this.sortDirection.getValue() === 'asc' ? 'desc' : 'asc'
    );
  }
}
