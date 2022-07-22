import { environment } from '../environments/environment';

export class HttpConfig {
  static readonly MAIN_API_URL = '/main-service/api/v1';
  static readonly AUTH_API_URL = '/auth/api/v1';

  static mainApiUrl() {
    return environment.mainUrl + this.MAIN_API_URL;
  }

  // static authApiUrl() {
  //   return environment.authUrl + this.AUTH_API_URL;
  // }
}