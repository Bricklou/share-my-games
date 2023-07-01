import { InjectionToken } from '@angular/core';
import { User } from '../interfaces/user';

export const INIT_AUTH_USER = new InjectionToken<User | undefined>(
  'init-auth.user'
);
