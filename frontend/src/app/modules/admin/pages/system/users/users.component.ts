import { Apollo } from 'apollo-angular';
import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import listUsersQuery from './list-users.graphql';
import { User } from '@app/modules/shared/interfaces/user';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Dialog } from '@angular/cdk/dialog';
import { AuthService } from '@app/modules/shared/services/auth/auth.service';

export interface AdminDialogData<TResult = string> {
  title: string;
  message: string;

  actions: Array<{
    label: string;
    style: string;
    resultID: TResult;
  }>;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnDestroy {
  private querySub: Subscription;
  protected users?: User[];
  private currentUser?: User;

  public constructor(
    private apollo: Apollo,
    @Optional() @Inject(REQUEST) private request: Request,
    private dialog: Dialog,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.userValue;

    this.querySub = this.apollo
      .query<{ getUsers: User[] }>({
        query: listUsersQuery,
      })
      .subscribe((result) => {
        this.users = result.data.getUsers;
      });
  }

  protected openDeleteDialog(userId: number): void {
    //
  }

  protected openDisableDialog(userId: number): void {
    //
  }

  protected isAllowedToEdit(user: User): boolean {
    return user.id !== this.currentUser?.id;
  }

  public ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
