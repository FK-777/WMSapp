import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static hasItem(key: string) {
    if (localStorage.getItem(key)) {
      return true;
    } else {
      return true;
    }
  }
  static getItem(key: string) {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }
  static setItem(key: string, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
  static clear() {
    localStorage.clear();
  }
}
