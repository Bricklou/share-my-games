import { Component, Input } from '@angular/core';
import { PopupService } from '@app/modules/admin/services/popup.service';
import { User } from '@app/modules/shared/interfaces/user';

enum UserDeleteDialogResult {
  delete = 'delete',
  cancel = 'cancel',
}

enum UserDisableDialogResult {
  disable = 'disable',
  cancel = 'cancel',
}

@Component({
  selector: 'app-user-item-action',
  templateUrl: './user-item-action.component.html',
  styleUrls: ['./user-item-action.component.css'],
})
export class UserItemActionComponent {
  @Input() public user!: User;

  @Input()
  public allowEdit = false;

  public constructor(private popupService: PopupService) {}

  protected openDeleteDialog(): void {
    const dialogRef = this.popupService.open<UserDeleteDialogResult>({
      title: 'Delete user',
      message: `Are you sure you want to delete user ${this.user.username}?`,
      actions: [
        {
          label: 'Delete',
          style: 'btn-error',
          resultID: UserDeleteDialogResult.delete,
          icon: 'trash',
        },
        {
          label: 'Cancel',
          resultID: UserDeleteDialogResult.cancel,
          icon: 'x-circle',
        },
      ],
    });

    dialogRef.closed.subscribe((result) => {
      console.log(result);
    });
  }

  protected openDisableDialog(): void {
    const dialogRef = this.popupService.open<UserDisableDialogResult>({
      title: 'Disable user',
      message: `Are you sure you want to disable user "${this.user.username}"?`,
      actions: [
        {
          label: 'Disable',
          style: 'btn-error',
          resultID: UserDisableDialogResult.disable,
          icon: 'user-x',
        },
        {
          label: 'Cancel',
          resultID: UserDisableDialogResult.cancel,
          icon: 'x-circle',
        },
      ],
    });

    dialogRef.closed.subscribe((result) => {
      console.log(result);
    });
  }

  protected onDialogCallback(result: string | undefined): void {
    console.log(result);
    //
  }
}
