import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { AuthService } from '../store/auth';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  public canLoad(): boolean {
    if (this.authService.getAccessToken() === null) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  public canActivate(): boolean {
    if (this.authService.getAccessToken() === null) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
