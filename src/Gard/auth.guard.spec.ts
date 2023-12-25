import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginService } from '../services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('authGuard', () => {
  let authGuard: AuthGuard;
  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, LoginService, Router],
      imports: [HttpClientTestingModule],
    });

    authGuard = TestBed.inject(AuthGuard);
    loginService = TestBed.inject(LoginService) as any;
    router = TestBed.inject(Router) as any;
  });
  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access when the user is authenticated', () => {
    // Arrange

    const getIsAuthenticatedSpy = jest.spyOn(
      loginService,
      'getIsAuthenticated'
    );
    getIsAuthenticatedSpy.mockReturnValue(true);
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');

    const canActivate = authGuard.canActivate();
    // Act

    // Assert
    expect(canActivate).toBe(true);
    expect(loginService.getIsAuthenticated).toHaveBeenCalled();
    expect(navigateByUrlSpy).not.toHaveBeenCalled();
  });

  it('should navigate to /login and return false when the user is not authenticated', () => {
    // Arrange
    const getIsAuthenticatedSpy = jest.spyOn(
      loginService,
      'getIsAuthenticated'
    );
    getIsAuthenticatedSpy.mockReturnValue(false);
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');
    navigateByUrlSpy.mockReturnValue('/login' as unknown as Promise<boolean>);

    // Act
    const canActivate = authGuard.canActivate();

    // Assert
    expect(canActivate).toBe(false);
    expect(loginService.getIsAuthenticated).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
