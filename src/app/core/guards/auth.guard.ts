import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject, ɵɵinject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  if (!authService.isLoggedIn()) {
    _route.navigate(['sign-in'], { queryParams: { redirectUrl: state.url } });
    return false;
  } else {
    return true;
  }
}

export const signedInGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  if (authService.isLoggedIn()) {
    _route.navigate(['home']);
    return false;
  } else {
    return true;
  }
}

export const adminGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  const storeRoleFromToken = authService.getRoleFromToken();
  if (storeRoleFromToken === "Admin") {
    return true;
  } else {
    // _route.navigate(['home']);
    // return false;
    return true;
  }
}

export const userGuard: CanActivateFn = (route, state) => {
  let _route = inject(Router);
  const authService = ɵɵinject(AuthService);
  const storeRoleFromToken = authService.getRoleFromToken();
  if (storeRoleFromToken === "User") {
    return true;
  } else {
    _route.navigate(['home']);
    return false;
  }
}
