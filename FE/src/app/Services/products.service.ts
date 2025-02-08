import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  BaseUrl: string = environment.apiBaseUrl;
  productDetail = new BehaviorSubject<Product | {}>({});
  addToCartData = new BehaviorSubject<Product[]>([]);
  addToCartData$ = this.addToCartData.asObservable();
  private cartList: Product[] = [];
  constructor(private http: HttpClient) {}

  productDetailsFromStorage(): Product {
    const cartData = localStorage.getItem('productDetail');
    return cartData ? JSON.parse(cartData) : [];
  }
  productDetails(cartDetails: Product) {
    localStorage.setItem('productDetail', JSON.stringify(cartDetails));
  }
  setaddtocartProduct(product: Product) {
    this.cartList.push(product);
    this.addToCartData.next(this.cartList);
    localStorage.setItem('addToCart', JSON.stringify(this.addToCartData.value));
    console.log(this.addToCartData, 'checked');
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BaseUrl + `products`);
  }
  addToCartApi(data: Product) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http.post<any>(this.BaseUrl + `addToCart`, body, {
      headers: headers,
    });
  }
  getAllCartData(){
    return this.http.get<any>(this.BaseUrl +`getCartData`);
  }
  //     /products',
  // /addToCart'
  // /addProduct
  // /wishlist',
}
