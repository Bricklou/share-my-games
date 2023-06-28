import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const logger = inject(LoggerService);

  if (authService.isLoggedIn) {
    logger.log('User is logged in');
    return true;
  }

  logger.log('Redirecting to login page');
  return router.navigate(['/auth/login'], {
    queryParams: {
      redirect: route.url,
    },
  });
};
