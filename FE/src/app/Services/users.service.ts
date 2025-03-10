import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

    getAllUserList(){
      return this.http.get<Array<any>>(this.apiUrl +`user-list`);
    }

}
