import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {
  public constructor(
    @Optional() @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(REQUEST) private httpRequest?: Request
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      isPlatformServer(this.platformId) &&
      this.httpRequest &&
      this.httpRequest.headers.cookie
    ) {
      request = request.clone({
        headers: request.headers.set('cookie', this.httpRequest.headers.cookie),
      });
    } else {
      request = request.clone({ withCredentials: true });
    }

    return next.handle(request);
  }
}
