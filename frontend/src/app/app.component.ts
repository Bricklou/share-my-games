import { Component, OnDestroy } from '@angular/core';
import { LoadingBarService } from './services/loading-bar.service';
import { Subscription } from 'rxjs';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  private loadingSub: Subscription;

  public constructor(
    private loadingBar: LoadingBarService,
    private router: Router
  ) {
    this.loadingSub = this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          this.loadingBar.start();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.loadingBar.complete();
        }
      },
      error: () => {
        this.loadingBar.complete();
      },
    });
  }
  public ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
}
