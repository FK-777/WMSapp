import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly LOGGED_USER_KEY = 'zaqoota-client-user';
  static loggedUser = null;

  private static logStatus = new Subject<boolean>();
  public static getLogStatus(): Observable<any> {
    return this.logStatus.asObservable();
  }

  static isLogged() {
    const loggedUser = StorageService.getItem(AuthService.LOGGED_USER_KEY);
    this.loggedUser = loggedUser;
    const isLogged = loggedUser && new Date(loggedUser.exp).getTime() > Math.round((new Date()).getTime() / 1000);
    if (!isLogged) {
      this.removeLoggedUser();
    }
    return isLogged;
  }

  static getLoggedUser() {
    return StorageService.getItem(AuthService.LOGGED_USER_KEY);
  }

  static setLoggedUser(userAllDetails) {
    const tokenWithDetail = {
      data: userAllDetails.userInfo
    };
    const tokenDetails = JSON.parse(atob(userAllDetails.tokenInfo.split('.')[1]));
    tokenWithDetail[`exp`] = tokenDetails.exp;
    tokenWithDetail[`iat`] = tokenDetails.iat;
    tokenWithDetail[`tokenInfo`] = userAllDetails.tokenInfo;
    StorageService.setItem(AuthService.LOGGED_USER_KEY, tokenWithDetail);
    this.logStatus.next(true);
  }

  static removeLoggedUser() {
    StorageService.removeItem(AuthService.LOGGED_USER_KEY);
    StorageService.removeItem('zaqoota-cart-products');
    StorageService.removeItem('zaqoota-current-city');
    StorageService.removeItem('zaqoota-delivery-address');
    StorageService.removeItem('zaqoota-pickup-address');
    StorageService.removeItem('zaqoota-active-delivery');

    this.logStatus.next(false);
    return true;
  }
}
