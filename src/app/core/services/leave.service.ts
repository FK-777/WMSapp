import { Injectable } from '@angular/core';
import { WrapHttpService } from './common/wrap-http.service';
import { HttpConfig } from '../../../config/http-config';

@Injectable({
  providedIn: 'root'
})
export class leaveService {
    private leaveUrl = HttpConfig.mainApiUrl() + '/leave';
    //private urlInitiated = false;

    constructor(private http: WrapHttpService) { }

    getLeaves(conditions?: object) {
      return this.http.get(this.leaveUrl + WrapHttpService.objToQuery(conditions));
    }
  
    createLeaves(data: Object) {
      console.log("Create!");
      console.log(data);
      console.log(this.leaveUrl);
      return this.http.post(this.leaveUrl, data);
    }
  
    updateLeaves(id: string, data: Object) {
      return this.http.patch(this.leaveUrl + '/' + id, data);
    }
  
    deleteLeaves(id: string) {
      return this.http.delete(this.leaveUrl + '/' + id);
    }
}