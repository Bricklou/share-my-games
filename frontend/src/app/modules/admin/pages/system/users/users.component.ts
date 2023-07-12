import { Apollo } from 'apollo-angular';
import { Component } from '@angular/core';
import { User } from '@app/modules/shared/interfaces/user';
import { Dialog } from '@angular/cdk/dialog';
import { AuthService } from '@app/modules/shared/services/auth/auth.service';
import { PopupComponent } from '@app/modules/admin/components/popup/popup.component';
import { UsersListDataSource } from './users.datasource';

export enum AdminDialogResult {
  delete = 'delete',
  disable = 'disable',
  cancel = 'cancel',
}

export interface AdminDialogData<TResult = string> {
  title: string;
  message: string;

  actions: Array<{
    label: string;
    style?: string;
    resultID: TResult;
  }>;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  protected usersDataSource = new UsersListDataSource(this.apollo);
  private currentUser?: User;

  public constructor(
    private apollo: Apollo,
    private dialog: Dialog,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.user.value;
  }

  protected openDeleteDialog(user: User): void {
    this.dialog.open<AdminDialogResult, AdminDialogData<AdminDialogResult>>(
      PopupComponent,
      {
        data: {
          title: `Delete user ${user.username}?`,
          message: `Are you sure you want to delete user ${user.username}?`,
          actions: [
            {
              label: 'Cancel',
              resultID: AdminDialogResult.cancel,
            },
            {
              label: 'Delete',
              style: 'btn-danger',
              resultID: AdminDialogResult.delete,
            },
          ],
        },
      }
    );
  }

  protected openDisableDialog(user: User): void {
    //
  }

  protected isAllowedToEdit(user: User): boolean {
    return user.id !== this.currentUser?.id;
  }

  protected onColumnClick(fieldName: keyof User): void {
    if (this.usersDataSource.sortBy.value === fieldName) {
      this.usersDataSource.toggleDirection();
    } else {
      this.usersDataSource.sort(fieldName);
    }
  }

  protected trackBy(index: number, user: User): number {
    return user.id;
  }

  public onPageChange(page: number): void {
    this.usersDataSource.setPage(page);
  }
}
