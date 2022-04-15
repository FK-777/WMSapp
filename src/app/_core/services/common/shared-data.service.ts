import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private isDayStart = false;
  private userName = {
    fName: '',
    lName: ''
  };
  isDayStartSub: BehaviorSubject<boolean>;
  userNameSub: BehaviorSubject<any>;

  constructor() {
    this.isDayStartSub = new BehaviorSubject(this.isDayStart);
    this.userNameSub = new BehaviorSubject(this.userName);
  }

  setIsDayStart(isDayStart: boolean) {
    this.isDayStartSub.next(isDayStart);
  }

  setUserName(userName: object) {
    this.userNameSub.next(userName);
  }
}
