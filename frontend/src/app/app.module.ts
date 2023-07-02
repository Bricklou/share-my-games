import { APP_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { LoadingBarService } from './services/loading-bar.service';
import { LoadingBarIndicatorComponent } from './components/loading-bar-indicator/loading-bar-indicator.component';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { ThemeService } from './modules/shared/services/theme.service';
import { LoggerService } from './modules/shared/services/logger.service';
import { AuthService } from './modules/shared/services/auth/auth.service';

export const APP_NAME = 'Share My Games';

@NgModule({
  declarations: [AppComponent, LoadingBarIndicatorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SharedModule.forRoot(),

    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: APP_ID, useValue: 'share-my-games' },

    LoadingBarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  public constructor(
    private cookieService: SsrCookieService,
    private themeService: ThemeService,
    private logger: LoggerService,
    private authService: AuthService
  ) {}
}
