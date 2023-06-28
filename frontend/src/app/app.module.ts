import { APP_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { LoadingBarService } from './services/loading-bar.service';
import { LoadingBarIndicatorComponent } from './components/loading-bar-indicator/loading-bar-indicator.component';

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
export class AppModule {}
