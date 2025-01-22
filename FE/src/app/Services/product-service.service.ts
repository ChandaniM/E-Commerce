import { HttpClient } from '@angular/common/http';
import { Injectable , inject } from '@angular/core';
import { Observable } from 'rxjs';


export interface Product {
  productId: string; 
  product_name: string; 
  category: string; 
  discountedPrice: string; 
  actual_price: string; 
  discountPercentage: string;
  rating: string; 
  ratingCount?: string;
  aboutProduct: string;
  userId: string; 
  userName: string;
  reviewId: string; 
  reviewTitle: string;
  reviewContent: string;
  img_link: string; 
  productLink: string; 
}



@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
   baseUrl : string = "http://localhost:3000";
   private readonly http: HttpClient = inject(HttpClient);


  constructor() { }

  getAllProductList() : Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'/products')
  }
}
