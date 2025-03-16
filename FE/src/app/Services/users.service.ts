import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiUrl;
  private userDetailsEdit = new BehaviorSubject<any>({});
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

    getAllUserList(){
      return this.http.get<Array<any>>(this.apiUrl +`user-list`);
    }

    get userDetails(): Observable<any> {
      return this.userDetailsEdit.asObservable(); 
    }
  
    setUserDetails(value: any) {
      this.userDetailsEdit.next(value);
    }

    deleteUser(id:number){
      console.log(this.apiUrl + `deleteUser/${id}`)
      return this.http.delete<{ message: string }>(this.apiUrl + `deleteUser/${id}`)
    }
}
