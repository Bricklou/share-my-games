import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }

      return router.createUrlTree(['/auth/login'], {
        queryParams: {
          redirect: route.url,
        },
      });
    })
  );
};
