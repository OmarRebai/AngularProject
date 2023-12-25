import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.getIsAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
