import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WrapHttpService } from './common/wrap-http.service';
import { HttpConfig } from './../../../config/http-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = HttpConfig.authApiUrl() + '/users';
  userUrl = HttpConfig.authApiUrl() + '/user';

  constructor(private http: WrapHttpService) { }
  // Get users list
  getUsers(conditions?: object) {
    return this.http.get(this.apiUrl + WrapHttpService.objToQuery(conditions));
  }

  //get current loggedIn User
  getCurrentUser() {
    return this.http.get(this.userUrl + '/current');
  }

  //set current user profile
  setCurrentUserProfile(data) {
    return this.http.put(this.userUrl + '/current', data);
  }

  changeActivationStatusOfUser(id: number, status: Boolean) {
    return this.http.put(this.userUrl, { id, isActive: status });
  }

  //Post User 
  addUser(data) {
    return this.http.post(this.apiUrl, data);
  }
  //Delete User 
  deleteUser(id)
 {
    return this.http.delete(`${this.userUrl}/${id}`);
  }

  //Delete User 
  updateUser(id, data) {
    return this.http.put(`${this.userUrl}/${id}`, data);
  }
}