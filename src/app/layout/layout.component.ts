import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  user!: any;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUserClaims().then((u) => {
      this.user = u;
    });
  }
  logout(): void {
    this.authService.doLogout().then(() => {
      this.successRedirect();
    });
  }
  successRedirect(): void {
    this.router.navigate(['/login']);
  }
}
