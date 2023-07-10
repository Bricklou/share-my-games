import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { XhrFactory } from '@angular/common';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import xhr2 from 'xhr2';

// Activate cookie for server-side rendering
export class ServerXhr implements XhrFactory {
  public build(): XMLHttpRequest {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    xhr2.prototype._restrictedHeaders.cookie = false;
    return new xhr2.XMLHttpRequest();
  }
}

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [{ provide: XhrFactory, useClass: ServerXhr }],
})
export class AppServerModule {}
