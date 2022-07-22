import { Injectable } from '@angular/core';
import { WrapHttpService } from './common/wrap-http.service';
import { HttpConfig } from '../../../config/http-config';

@Injectable({
  providedIn: 'root'
})
export class locationService {
    private locationUrl = HttpConfig.mainApiUrl() + '/location';
    //private urlInitiated = false;

    constructor(private http: WrapHttpService) { }

    getLocation(conditions?: object) {
      return this.http.get(this.locationUrl + WrapHttpService.objToQuery(conditions));
    }
  
    createLocation(data: Object) {
      console.log("Create!");
      console.log(data);
      console.log(this.locationUrl);
      return this.http.post(this.locationUrl, data);
    }
  
    updateLocation(id: string, data: Object) {
      return this.http.patch(this.locationUrl + '/' + id, data);
    }
  
    deleteLocation(id: string) {
      return this.http.delete(this.locationUrl + '/' + id);
    }
}