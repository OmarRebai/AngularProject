import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}
  tryGoogleLogin(): void {
    this.authService.doGoogleLogin().then(() => {
      this.successRedirect();
    });
  }
  successRedirect(): void {
    this.ngZone.run(() => this.router.navigate(['/members']));
  }
}
