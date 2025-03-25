import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, MatTabsModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  quantity: number = 1;
  maxQuantity: number = 10;

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  AddToCart() {

  }

  BuyNow() {

  }
}
