import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { APP_NAME } from '@app/app.module';
import { User } from '@app/modules/shared/interfaces/user';
import { AuthService } from '@app/modules/shared/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class AdminSidebarComponent implements OnDestroy, AfterViewChecked {
  protected user?: User;

  @ViewChildren('menus')
  protected submenus?: QueryList<ElementRef<HTMLDetailsElement>>;

  private authSub: Subscription;

  public constructor(authService: AuthService, router: Router) {
    this.user = authService.user.value;

    this.authSub = authService.user.subscribe((user) => {
      this.user = user;

      if (!user) {
        void router.navigate(['/login']);
      }
    });
  }

  public ngAfterViewChecked(): void {
    this.updateSubmenus();
  }

  private updateSubmenus(): void {
    this.submenus?.forEach((submenu) => {
      submenu.nativeElement.open =
        !!submenu.nativeElement.querySelector('.active');
    });
  }

  public ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  protected get appName(): string {
    return APP_NAME;
  }
}
