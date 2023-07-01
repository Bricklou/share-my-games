import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { DOCUMENT } from '@angular/common';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export enum Theme {
  light = 'light',
  dark = 'dark',
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeKey = 'theme';

  public _theme = new BehaviorSubject<Theme>(Theme.light);
  public readonly events: Observable<Theme>;

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: LoggerService,
    cookieService: SsrCookieService
  ) {
    this.events = this._theme.asObservable();

    this.updateDom(this._theme.value);

    const theme = cookieService.get(this.themeKey);
    if (theme) {
      this._theme.next(theme as Theme);
    }

    this.events.subscribe((theme) => {
      cookieService.set(this.themeKey, theme, 7 * 24 * 60 * 60);
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
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
