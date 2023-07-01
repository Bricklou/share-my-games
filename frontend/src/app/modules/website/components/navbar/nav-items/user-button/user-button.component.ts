import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@app/modules/shared/services/auth/auth.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
})
export class UserButtonComponent implements OnDestroy {
  protected showGuest = true;

  private readonly userSub$ = this.authService.isAuthenticated
    .pipe(distinctUntilChanged())
    .subscribe((isAuthenticated) => {
      this.showGuest = !isAuthenticated;
    });

  public constructor(private authService: AuthService) {}

  public ngOnDestroy(): void {
    this.userSub$.unsubscribe();
  }
}
