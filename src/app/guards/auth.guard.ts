import { CanActivateFn, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.IsAuthenticated()) {
    return true;
  } 
  router.navigate(['/login']);
    return false;
};

export const authGuardChild: CanActivateChildFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.IsAuthenticated()) {
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
  
};
