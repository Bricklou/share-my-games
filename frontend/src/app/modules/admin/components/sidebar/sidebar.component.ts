import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_NAME } from '@app/app.module';
import { User } from '@app/modules/shared/interfaces/user';
import { AuthService } from '@app/modules/shared/services/auth/auth.service';
import { ThemeService } from '@app/modules/shared/services/theme.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class AdminSidebarComponent {
  protected user!: User;

  public constructor(
    private authService: AuthService,
    router: Router,
    private themeService: ThemeService
  ) {
    if (!authService.userValue) {
      void router.navigate(['/login']);
      return;
    }

    this.user = authService.userValue;
  }

  protected get appName(): string {
    return APP_NAME;
  }
}
