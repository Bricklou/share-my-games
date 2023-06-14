import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from './logger.service';

export enum Theme {
  light = 'light',
  dark = 'dark',
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeKey = 'theme';

  public _theme = new BehaviorSubject<Theme>(Theme.light);
  public readonly events: Observable<Theme>;

  public constructor(private logger: LoggerService) {
    this.events = this._theme.asObservable();
    this.updateDom(this._theme.value);

    const theme = localStorage.getItem(this.themeKey);
    if (theme) {
      this._theme.next(theme as Theme);
    }

    this.events.subscribe((theme) => {
      localStorage.setItem(this.themeKey, theme);
      this.logger.debug(`Theme changed to "${theme}"`);
      this.updateDom(theme);
    });
  }

  public toggleTheme(): void {
    this._theme.next(
      this._theme.value === Theme.light ? Theme.dark : Theme.light
    );
  }

  public get currentTheme(): Theme {
    return this._theme.value;
  }

  private updateDom(theme: Theme): void {
    document.body.setAttribute('data-theme', theme);
  }
}
