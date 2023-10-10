import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1), 
      exhaustMap(user => {
        if (user) {
          return next.handle(request.clone({params: new HttpParams().set('auth', user.token)}));
        }
      return next.handle(request);
    }));

    
  }
}
