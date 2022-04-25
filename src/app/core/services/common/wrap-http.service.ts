import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { AuthService } from './auth.service';

@Injectable()
export class WrapHttpService {
  public data: number;
  constructor(private http: HttpClient) { }

  private static createHeaderOptions(headers) {
    const user = AuthService.getLoggedUser();
    console.log(user);
    
    if (user) {
      if (!headers) {
        headers = {};
      }
      headers['Authorization'] = 'Bearer ' + user.accessToken;
      headers['Accept'] = '*/*';
    }

    const httpOptions = {};
    if (headers) {
      httpOptions['headers'] = new HttpHeaders(headers);
    }
    return httpOptions;
  }

  public static objToQuery(obj) {
    if (!obj || _.isEmpty(obj)) {
      return '';
    }
    const params = new URLSearchParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.set(key, obj[key]);
      }
    }
    return '?' + params;
  }

  get(url: string, headers?: object): Observable<any> {
    console.log(url);
    return this.http.get(url, WrapHttpService.createHeaderOptions(headers));
  }
  post(url: string, data: object, headers?: object): Observable<any> {
    console.log(url, data, headers);
    return this.http.post(url, data, WrapHttpService.createHeaderOptions(headers));
  }
  put(url: string, data: object, headers?: object): Observable<any> {
    return this.http.put(url, data, WrapHttpService.createHeaderOptions(headers));
  }
  patch(url: string, data: object, headers?: object): Observable<any> {
    return this.http.patch(url, data, WrapHttpService.createHeaderOptions(headers));
  }
  delete(url: string, headers?: object): Observable<any> {
    return this.http.delete(url, WrapHttpService.createHeaderOptions(headers));
  }

}
