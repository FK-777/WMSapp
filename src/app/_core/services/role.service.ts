import { Injectable } from '@angular/core';
import { WrapHttpService } from './common/wrap-http.service';
import { HttpConfig } from '../../../config/http-config';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = HttpConfig.authApiUrl() + '/role';
  apiModule = HttpConfig.authApiUrl() + '/module';

  constructor(private http: WrapHttpService) { }
  // get role
  getRoles(conditions?: object) {
    return this.http.get(this.apiUrl + WrapHttpService.objToQuery(conditions));
  }

  //Get Role Detail
  getRoleDetail(id: number) {
    return this.http.get(`${this.apiUrl}/detail/${id}`);
  }
  //Delete Role
  deleteRole(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}/delete`);
  }
  // post role 
  saveRole(data) {
    return this.http.post(this.apiUrl, data);
  }
  // Update role 
  updateRole(id, data) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  // get role
  getModuleActions(conditions?: object) {
    return this.http.get(this.apiModule + WrapHttpService.objToQuery(conditions));
  }

}