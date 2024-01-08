import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrxStore/app.reducer';
import { selectAuth } from '../ngrxStore/auth/auth.selectors';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  return store.select(selectAuth).pipe(
    take(1),
    map(authState => {
      const result = Boolean(authState.user);
      if (result) return true;
      return router.createUrlTree(['/auth']);
  }));
};
