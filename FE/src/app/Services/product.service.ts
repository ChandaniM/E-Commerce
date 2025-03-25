import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Product } from '../model/product.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { API_ENDPOINTS } from '../config/api-endpoints';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);
  productDetail = new Subject<Product[]>();
  productModify = new BehaviorSubject({});

  constructor() { }
  getAllProduct():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+API_ENDPOINTS.PRODUCT.GET_ALL);
  }

  addProduct(product:any) : Observable<any[]>{
    console.log(product , 'lol check the product......')
    return this.http.post<any>(this.apiUrl+ API_ENDPOINTS.PRODUCT.ADD_PRODUCT, product )
  }

  // productWrapper() {
  //   return this.getAllProduct().pipe(
  //     catchError((err) => {
  //       console.error(err);
  //       return throwError(() => err); // Proper error handling
  //     }),
  //     map((products) =>
        
  //       products.map((product, index) => ({
  //         id: product.product_id,
  //         name: product.short_title,
  //         description: product.about_product,
  //         price: Number(product.discounted_price.replace(/[₹,]/g, "")), 
  //         image: product.img_link,
  //         rating: Number(product.rating),
  //         sale: product.on_sale == 0 ? false : true,
  //         category : product.category.split("|"), 
  //         grams: product.category.split("|"),
  //         layout: "portrait",
  
  //         features: {
  //           cardWidth: null,
  //           button: {
  //             show: false,
  //             text: "",
  //           },
  //           gramsTags: false,
  //           input: {
  //             show: false,
  //             type: "",
  //           },
  //           titleAlignment: "left",
  //           buttonWrapper: "flex-row"
  //         },
  //       }))
  //     )
  //   );
  // }
  
  setProductFormAdmin(value:any){
    this.productModify.next(value);
  }

  get productModifyByAdminDetails(): Observable<any> {
    return this.productModify.asObservable(); 
  }
    
}
