import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable, exhaustMap, map, take } from 'rxjs';
import { AppState } from '../ngrxStore/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1), 
      map(authState => authState.user),
      exhaustMap(user => {
        if (user) {
          return next.handle(request.clone({params: new HttpParams().set('auth', user.token)}));
        }
      return next.handle(request);
    }));

    
  }
}
