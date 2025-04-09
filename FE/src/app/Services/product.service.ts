import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { Product } from '../model/product.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { API_ENDPOINTS } from '../config/api-endpoints';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);

  productDetail = new Subject<Product[]>();
  productModify = new BehaviorSubject({});
  private productCart = new BehaviorSubject<any[]>([]);

  data$ = this.productCart.asObservable();

  constructor() {}

  getAllProduct(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + API_ENDPOINTS.PRODUCT.GET_ALL);
  }

  productWrapper() {
    return this.getAllProduct().pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      }),
      map((products) =>
        products.map((product, index) => ({
          id: product.id,
          name: product.name || '',
          shortTitle: product.short_title || '',
          categoryId: product.category_id || null,
          brand: product.brand || '',
          sku: product.sku || '',
          discountPrice: product.discount_price
            ? Number(product.discount_price)
            : 0,
          actualPrice: product.actual_price ? Number(product.actual_price) : 0,
          stockQuantity: product.stock_quantity || 0,
          rating: product.rating || 0,
          ratingCount: product.rating_count || 0,
          description: product.description || '',
          detailDescription: product.detail_description || '',
          weight: product.weight || '',
          onSale: product.on_sale === 1,
          userId: product.user_id || null,
          image: product.img_link || '',
          productLink: product.product_link || '',
          createdAt: product.created_at || '',
          updatedAt: product.updated_at || '',
          categoryName: product.category_name || '',
          mainCategoryName: product.main_category_name || '',
          category: (product.category || '').split('|'),
          grams: (product.category || '').split('|'),
          features: {
            cardWidth: null,
            button: {
              show: false,
              text: '',
            },
            gramsTags: false,
            input: {
              show: false,
              type: '',
            },
            titleAlignment: 'left',
            buttonWrapper: 'flex-row',
          },
        }))
      )
    );
  }

  addProduct(product: any): Observable<any[]> {
    console.log(product, 'lol check the product......');
    return this.http.post<any>(
      this.apiUrl + API_ENDPOINTS.PRODUCT.ADD_PRODUCT,
      product
    );
  }

  productById(id: number) {
    return this.http.get(this.apiUrl + `products/${id}`);
  }

  setProductFormAdmin(value: any) {
    this.productModify.next(value);
  }

  get productModifyByAdminDetails(): Observable<any> {
    return this.productModify.asObservable();
  }

  getData() {
    return this.productCart.getValue();
  }

  // Add object to array
  addItem(item: any) {
    const currentData = this.productCart.getValue();
    this.productCart.next([...currentData, item]); // add new item to array
  }

  // Remove object by index
  removeItem(index: number) {
    const currentData = this.productCart.getValue();
    currentData.splice(index, 1);
    this.productCart.next([...currentData]);
  }

  // Update object by index
  updateItem(index: number, newItem: any) {
    const currentData = this.productCart.getValue();
    currentData[index] = newItem;
    this.productCart.next([...currentData]);
  }
}
