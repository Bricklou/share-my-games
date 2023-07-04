import { Component, Input, OnDestroy } from '@angular/core';
import {
  Theme,
  ThemeService,
} from '@app/modules/shared/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-btn',
  templateUrl: './theme-button.component.html',
})
export class ThemeButtonComponent implements OnDestroy {
  protected theme: Theme;

  @Input()
  public tooltipPosition:
    | 'tooltip-left'
    | 'tooltip-right'
    | 'tooltip-top'
    | 'tooltip-bottom' = 'tooltip-bottom';

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
