import { Injectable } from '@angular/core';
import { WrapHttpService } from './common/wrap-http.service';
import { HttpConfig } from '../../../config/http-config';

@Injectable({
  providedIn: 'root'
})
export class userService {
    private userUrl = HttpConfig.mainApiUrl() + '/user';
    //private urlInitiated = false;

    constructor(private http: WrapHttpService) { }

    getUsers(conditions?: object) {
      console.log(conditions);
      return this.http.get(this.userUrl + WrapHttpService.objToQuery(conditions));
    }
  
    createUsers(data: Object) {
      return this.http.post(this.userUrl, data);
    }
  
    updateUsers(id: string, data: Object) {
      return this.http.patch(this.userUrl + '/' + id, data);
    }
  
    deleteUsers(id: string) {
      return this.http.delete(this.userUrl + '/' + id);
    }
}