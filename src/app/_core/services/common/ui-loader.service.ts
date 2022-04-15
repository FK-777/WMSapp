import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiLoaderService {
  private loaderSubj = new Subject<any>();

  constructor() { }

  showLoader() {
    this.loaderSubj.next(true);
  }

  hideLoader() {
    this.loaderSubj.next(false);
  }

  getLoaderStatus(): Observable<any> {
      return this.loaderSubj.asObservable();
  }
}
