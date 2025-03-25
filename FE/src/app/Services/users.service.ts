import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/addUser.typs';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiUrl;
  private userDetailsEdit = new BehaviorSubject<any>({});
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

    getAllUserList(){
      return this.http.get<Array<any>>(this.apiUrl + API_ENDPOINTS.USER.GET_ALL);
    }

    get userDetails(): Observable<any> {
      return this.userDetailsEdit.asObservable(); 
    }
  
    setUserDetails(value: any) {
      this.userDetailsEdit.next(value);
    }

    deleteUser(id:number){
      return this.http.delete<any>(this.apiUrl + API_ENDPOINTS.USER.DELETE(id));
    }

    addNewUser(userData: User): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}${API_ENDPOINTS.USER.ADD_USER}`, userData);
    } 

    updateUserData(userData: User , id:number): Observable<any>{
      return this.http.put<any>(this.apiUrl+API_ENDPOINTS.USER.EDIT_USER_BY_ID(id) , userData);
    }
}
