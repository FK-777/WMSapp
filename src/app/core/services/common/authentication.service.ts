import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../../config/http-config';
import { WrapHttpService } from './wrap-http.service';

@Injectable()
export class AuthenticationService {
  public readonly apiUrl = HttpConfig.mainApiUrl();
  // public readonly baseUrl = environment.baseUrl;

  constructor(public http: WrapHttpService) {
  }

  login(email: string, password: string): Promise<any> {
    return this.http.post(this.apiUrl + '/auth/login', {
      email,
      password
    }).toPromise();
  }

  // register(newUser: object): Promise<any> {
  //   return this.http.post(this.apiUrl + '/auth/signup', newUser).toPromise();
  // }

   verifyAccount(verification: string): Promise<any> {
     return this.http.post(this.apiUrl + '/auth/verify-email', { verification }).toPromise();
   }

   resendVerification(email: string): Promise<any> {
     return this.http.post(this.apiUrl + '/auth/verify-email-send', { email }).toPromise();
   }

   forgotPassword(email: string): Promise<any> {
     return this.http.post(this.apiUrl + '/auth/forgot-password', { email }).toPromise();
   }

   forgotPasswordVerify(verification: string): Promise<any> {
     return this.http.post(this.apiUrl + '/auth/forgot-password-verify', { verification }).toPromise();
   }

   changePassword(email: string, password: string): Observable<any> {
     return this.http.post(this.apiUrl + '/change-password', { email: email, password: password });
   }

   resetPassword(email: string, password: string) {
     return this.http.post(this.apiUrl + '/auth/reset-password', {
       email,
       password
     }).toPromise();
   }
}
