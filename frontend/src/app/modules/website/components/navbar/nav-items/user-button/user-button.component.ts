import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/modules/shared/services/auth/auth.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css'],
})
export class UserButtonComponent implements OnDestroy {
  protected showGuest = true;

  private readonly userSub$ = this.authService.isAuthenticated
    .pipe(distinctUntilChanged())
    .subscribe((isAuthenticated) => {
      this.showGuest = !isAuthenticated;
    });

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnDestroy(): void {
    this.userSub$.unsubscribe();
  }

  protected logout(): void {
    this.authService.logout().subscribe(() => {
      void this.router.navigate(['/']);
    });
  }
}
