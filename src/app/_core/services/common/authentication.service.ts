import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpConfig } from '../../../../config/http-config';
import { WrapHttpService } from './wrap-http.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationService {
  public token: string;
  public currentUser;
  public readonly apiUrl = HttpConfig.authApiUrl();
  // public readonly baseUrl = environment.baseUrl;

  constructor(public http: WrapHttpService) {
    // set token if saved in local storage
    this.currentUser = AuthService.getLoggedUser();
    this.token = this.currentUser && this.currentUser.token;
  }

  isLoggedIn() {
    return AuthService.isLogged();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/login', {
      email,
      password
    });
  }

  register(newUser: object): Observable<any> {
    return this.http.post(this.apiUrl + '/sign-up', newUser);
  }

  verifyOtp(phone: string, otp: number): Observable<any> {
    return this.http.post(this.apiUrl + '/verify-otp', { phone, otp });
  }

  resendOtp(phone: string): Observable<any> {
    return this.http.post(this.apiUrl + '/resend-otp', { phone });
  }

  forgotPassword(phone: string): Observable<any> {
    return this.http.post(this.apiUrl + '/forgot-password', { phone });
  }

  checkOtp(phone: string, otp: number): Observable<any> {
    return this.http.post(this.apiUrl + '/check-otp', { phone, otp });
  }

  resetPassword(phone: string, password: string, otp: string) {
    return this.http.post(this.apiUrl + '/reset-password', {
      phone,
      password,
      otp
    });
  }

  logout(): void {
    if (AuthService.isLogged()) {
      // clear token remove user from local storage to log user out
      AuthService.removeLoggedUser();
    }
  }

}
