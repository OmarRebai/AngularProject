import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
// import { AccessToken } from 'src/models/access_token';
// import { AuthenticationRequest } from 'src/models/authentication-request';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiServiceUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private cookie: CookieService) {}
  // authenticate(user: AuthenticationRequest): Observable<AccessToken> {
  //   return this.http.post<AccessToken>(
  //     `${this.apiServiceUrl}/api/v1/auth/authenticate`,
  //     user
  //   );
  // }
  // getUserByName(name: string): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiServiceUrl}/users?name=${name}`);
  // }
  getIsAuthenticated(): boolean {
    return this.cookie.get('isAuthenticated') === 'true';
  }
  setIsAuthenticated(state: boolean) {
    if (state) {
      this.cookie.set('isAuthenticated', 'true');
    } else {
      this.cookie.set('isAuthenticated', 'false');
    }
  }
  getUser(): any {
    return this.cookie.get('user');
  }
  setUser(user: any) {
    return this.cookie.set('user', user);
  }
}
