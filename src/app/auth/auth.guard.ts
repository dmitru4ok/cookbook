import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  return authService.user.pipe(
    take(1),
    map(user => {
      const result = Boolean(user);
      if (result) return true;
      return router.createUrlTree(['/auth']);
  }));
};
