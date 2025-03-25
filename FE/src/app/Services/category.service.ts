import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
apiUrl = environment.apiUrl;
private readonly http: HttpClient = inject(HttpClient);


  constructor() { }

  getAllCategory():Observable<any>{
    return this.http.get(this.apiUrl + API_ENDPOINTS.CATEGORY.GET_ALL_CATEGORY);
  }

  addCategory(categoryValue:object):Observable<any>{
    return this.http.post(this.apiUrl +API_ENDPOINTS.CATEGORY.ADD_CATEGORY , categoryValue);
  }

  deleteCategory(id:number){
    return this.http.delete<any>(this.apiUrl + API_ENDPOINTS.CATEGORY.DELETE_CATEGORY(id));
  }

}
