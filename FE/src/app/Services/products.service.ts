import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  BaseUrl : string = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.BaseUrl+`products`)
  }
}
