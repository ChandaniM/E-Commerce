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

  addItem(item: any) {
    const currentData = this.getCartFromStorage();
    const itemIndex = currentData.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex > -1) {
      currentData[itemIndex] = { ...currentData[itemIndex], ...item };
    } else {
      currentData.push(item);
    }
    this.productCart.next([...currentData]);
    this.saveCartToStorage(currentData);
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
 
  getCart(): any[] {
    return this.getCartFromStorage();
}
}
