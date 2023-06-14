import { Component, OnDestroy } from '@angular/core';
import {
  Theme,
  ThemeService,
} from '@app/modules/shared/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-theme-btn',
  templateUrl: './theme-button.component.html',
})
export class NavThemeButtonComponent implements OnDestroy {
  protected theme: Theme;

  private subscription: Subscription;

  public constructor(private themeService: ThemeService) {
    this.theme = this.themeService.currentTheme;

    this.subscription = this.themeService.events.subscribe((theme) => {
      this.theme = theme;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected onButtonClick(): void {
    this.themeService.toggleTheme();
  }
}
