import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '@app/modules/shared/services/logger.service';

@Injectable()
export class HttpDebugInterceptor implements HttpInterceptor {
  public constructor(private logger: LoggerService) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Debug request
    this.logger.debug(
      `HttpDebugInterceptor: ${request.method} ${request.urlWithParams}\n` +
        `\theaders: ${JSON.stringify(request.headers)}\n` +
        `\tbody: ${JSON.stringify(request.body)}`
    );
    return next.handle(request);
  }
}
