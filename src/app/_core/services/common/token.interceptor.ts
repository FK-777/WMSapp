import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = AuthService.getLoggedUser();
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.tokenInfo}`,
          'Accept': '*/*'
        }
      });
    }

    return next.handle(request);
  }
}
