import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productCart = new BehaviorSubject<any[]>(this.getCartFromStorage()); // ✅ Initialize from storage
  data$ = this.productCart.asObservable(); // Real-time Observable

  constructor() {}

  getData() {
    return this.productCart.getValue();
  }

  getCartCount(): number {
    return this.productCart.getValue().length;
  }

  // ✅ Add object to cart (Fixing Overwrite Issue)
  addItem(item: any) {
    const currentData = this.getCartFromStorage(); // ✅ Fetch existing cart
    const updatedCart = [...currentData, item]; // ✅ Append new item instead of overwriting
    this.productCart.next(updatedCart);
    this.saveCartToStorage(updatedCart); // ✅ Save updated cart to storage
  }

  // ✅ Remove object by ID
  removeItem(id: number) {
    const currentData = this.getCartFromStorage();
    const updatedCart = currentData.filter(item => item.id !== id);
    this.productCart.next(updatedCart);
    
    this.saveCartToStorage(updatedCart);
  }

  // ✅ Update object by index
  updateItem(index: number, newItem: any) {
    const currentData = this.getCartFromStorage();
    currentData[index] = newItem;
    this.productCart.next([...currentData]);
    this.saveCartToStorage(currentData);
  }


  private getCartFromStorage(): any[] {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  
  private saveCartToStorage(cart: any[]) {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }
  // private productCart = new BehaviorSubject<any[]>([]); 
  // data$ = this.productCart.asObservable(); // Real-time Observable

  // constructor() {}
  
  // getData() {
  //   return this.productCart.getValue();
  // }

  // getCartCount(): number {
  //   return this.getCartFromStorage().length;
  // }
  // // Add object to cart
  // addItem(item: any) {
  //   const currentData = this.productCart.getValue();
  //   const updatedCart = [...currentData, item];
  //   console.log(updatedCart)
  //   this.productCart.next(updatedCart);
  //   this.saveCartToStorage(updatedCart);  
  // }

  // // Remove object by index
  // removeItem(id: number) {
  //   const currentData = this.productCart.getValue();
  //   const updatedData = currentData.filter(item => item.id !== id); // Remove item with matching ID
  //   this.productCart.next(updatedData);
  // }
  

  // // Update object by index
  // updateItem(index: number, newItem: any) {
  //   const currentData = this.productCart.getValue();
  //   currentData[index] = newItem;
  //   this.productCart.next([...currentData]);
  // }

  // private getCartFromStorage(): any[] {
  //   const storedCart = localStorage.getItem('cartItems');
  //   return storedCart ? JSON.parse(storedCart) : [];
  // }
  
  // private saveCartToStorage(cart: any[]) {
  //   localStorage.setItem('cartItems', JSON.stringify(cart));
  // }

 
  
}
