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
  static readonly LOGGED_USER_KEY = 'ci-admin-user';
  static loggedUser = null;

  private static logStatus = new Subject<boolean>();
  public static getLogStatus(): Observable<any> {
    return this.logStatus.asObservable();
  }

  static isLogged() {
    const loggedUser = StorageService.getItem(AuthService.LOGGED_USER_KEY);
    this.loggedUser = loggedUser;
    
    const isLogged = loggedUser && new Date(loggedUser.exp).getTime() > Math.round((new Date()).getTime() / 1000);
    console.log("====> isLogged", loggedUser);
    
    if (!loggedUser) {
      this.removeLoggedUser();
      return false;
    }
    return true;
  }

  static getLoggedUser() {
    return StorageService.getItem(AuthService.LOGGED_USER_KEY);
  }

   static setLoggedUser(userAllDetails) {
     const tokenWithDetail = {
       exp: null,
       iat: null
     };
     const tokenDetails = JSON.parse(atob(userAllDetails.accessToken.split('.')[1]));
     tokenWithDetail.exp = tokenDetails.exp;
     tokenWithDetail.iat = tokenDetails.iat;
     StorageService.setItem(AuthService.LOGGED_USER_KEY, {...tokenWithDetail, ...userAllDetails});
     this.logStatus.next(true);
   }


  static removeLoggedUser() {
    StorageService.removeItem(AuthService.LOGGED_USER_KEY);
    this.logStatus.next(false);
    return true;
  }

  static checkPermission(moduleIdentifier, actionIdentifier?): boolean {
    const user = this.getLoggedUser();
    // If user not exist return false.
    if (!user || !user.permissions || !user.permissions.length) {
      return false;
    }

    const module = _.find(user.permissions, { identifier: moduleIdentifier });
    // If module not found in permissions return false.
    if (!module) {
      return false;
    }

    // If module and actionIdentifier is provided to check.
    if (moduleIdentifier && actionIdentifier) {
      const moduleAction = _.find(module.actions, { identifier: actionIdentifier});
      if (!moduleAction) {
        return false;
      }
    }

    return true;
  }
}
