import { Component, Input } from '@angular/core';
import { User } from '@app/modules/shared/interfaces/user';

@Component({
  selector: 'app-user-item-action',
  templateUrl: './user-item-action.component.html',
  styleUrls: ['./user-item-action.component.css'],
})
export class UserItemActionComponent {
  @Input() public user!: User;
}
