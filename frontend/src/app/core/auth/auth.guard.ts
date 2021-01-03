import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../store/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  public canLoad(): boolean {
    if (this.authService.getAccessToken() !== null) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  public canActivate(): boolean {
    if (this.authService.getAccessToken() !== null) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
