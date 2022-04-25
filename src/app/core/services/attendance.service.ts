import { Injectable } from '@angular/core';
import { WrapHttpService } from './common/wrap-http.service';
import { HttpConfig } from '../../../config/http-config';

@Injectable({
  providedIn: 'root'
})
export class attendanceService {
    private attendanceUrl = HttpConfig.mainApiUrl() + '/attendance';
    //private urlInitiated = false;

    constructor(private http: WrapHttpService) { }

    getAttendance(conditions?: object) {
      return this.http.get(this.attendanceUrl + WrapHttpService.objToQuery(conditions));
    }
  
    createAttendance(data: Object) {
      console.log("Create!");
      console.log(data);
      console.log(this.attendanceUrl);
      return this.http.post(this.attendanceUrl, data);
    }
  
    updateAttendance(id: string, data: Object) {
      return this.http.patch(this.attendanceUrl + '/' + id, data);
    }
  
    deleteAttendance(id: string) {
      return this.http.delete(this.attendanceUrl + '/' + id);
    }
}