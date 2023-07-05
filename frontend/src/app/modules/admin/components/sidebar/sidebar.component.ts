import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { APP_NAME } from '@app/app.module';
import { User } from '@app/modules/shared/interfaces/user';
import { AuthService } from '@app/modules/shared/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class AdminSidebarComponent implements AfterViewInit, OnDestroy {
  protected user?: User;

  @ViewChildren('details')
  protected submenus: HTMLDetailsElement[] = [];

  private authSub: Subscription;

  public constructor(authService: AuthService, router: Router) {
    this.authSub = authService.user.subscribe((user) => {
      this.user = user;

      if (!user) {
        void router.navigate(['/login']);
      }
    });

    this.user = authService.userValue;
  }

  public ngAfterViewInit(): void {
    for (const submenu of this.submenus) {
      if (submenu.querySelector('[routerlinkactive]')) {
        submenu.open = true;
      } else {
        submenu.open = false;
      }
    }
  }

  public ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  protected get appName(): string {
    return APP_NAME;
  }
}
