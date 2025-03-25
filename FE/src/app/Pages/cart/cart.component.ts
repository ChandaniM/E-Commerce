import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Product {
  id: number;
  image: string;
  name: string;
  quantity: number;
  price: number;
  maxQuantity: number;
}
@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: Product[] = [
    { id: 1, image: 'assets/img/product-images/17_1.jpg', name: 'Ginger - Organic', quantity: 1, price: 584, maxQuantity: 10 },
    { id: 2, image: 'assets/img/product-images/18_1.jpg', name: 'Apple - Fresh', quantity: 2, price: 300, maxQuantity: 10 },
  ];

  updateTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  increaseQuantity(index: number) {
    if (this.cartItems[index].quantity < this.cartItems[index].maxQuantity) {
      this.cartItems[index].quantity++;
    }
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }
}
