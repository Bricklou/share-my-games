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
  public readonly sortBy = new BehaviorSubject<keyof User>('username');
  public readonly sortDirection = new BehaviorSubject<'asc' | 'desc'>('asc');
  public readonly currentPage = new BehaviorSubject<number>(1);

  private _total = 0;
  public get total(): number {
    return this._total;
  }
  private _limit = 0;
  public get limit(): number {
    return this._limit;
  }
  private _showPagination = false;
  public get showPagination(): boolean {
    return this._showPagination;
  }

  //private querySubscription: Subscription;
  private queryObservable: Observable<readonly User[]>;

  public constructor(private apolloClient: Apollo) {
    super();

    this.queryObservable = combineLatest({
      by: this.sortBy,
      direction: this.sortDirection,
      page: this.currentPage,
    }).pipe(
      exhaustMap(({ by, direction, page }) =>
        this.apolloClient.query<{
          getUsers: {
            data: User[];
            current: number;
            limit: number;
            total: number;
          };
        }>({
          query: listUsersQuery,
          variables: {
            sortBy: by,
            sortDirection: direction,
            page,
            limit: 15,
          },
        })
      ),
      map(({ data }) => {
        this._total = data.getUsers.total;
        this._limit = data.getUsers.limit;
        this._showPagination = Math.ceil(this._total / this._limit) > 1;
        this.currentPage.next(data.getUsers.current);
        return data.getUsers.data;
      })
    );
  }

  public override connect(): Observable<readonly User[]> {
    return this.queryObservable;
  }

  public override disconnect(): void {
    this.sortDirection.unsubscribe();
    this.sortBy.unsubscribe();
    this.currentPage.unsubscribe();
  }

  public sort(sortBy: keyof User, sortDirection: 'asc' | 'desc' = 'asc'): void {
    if (this.sortDirection.value !== sortDirection) {
      this.sortDirection.next(sortDirection);
    }
    if (this.sortBy.value !== sortBy) {
      this.sortBy.next(sortBy);
    }
  }

  public toggleDirection(): void {
    this.sortDirection.next(
      this.sortDirection.value === 'asc' ? 'desc' : 'asc'
    );
  }

  public setPage(page: number): void {
    if (page < 0 || page > this.total) return;

    this.currentPage.next(page);
  }
}
