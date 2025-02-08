import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  cartItems: any[] = [];

  constructor(private productService: ProductsService) {
  }
  
  
  ngOnInit(): void {
    this.productService.addToCartData.subscribe((array)=>{
      console.log(array ,"arrray");
      console.log(localStorage.getItem("addToCart"))
      this.cartItems = array.length > 0 ? array : JSON.parse(localStorage.getItem("addToCart") || '[]');})
    console.log(this.cartItems)
  }

  removeItem(itemId: number): void {
    // this.cartService.removeFromCart(itemId);
  }

  clearCart(): void {
    // this.cartService.clearCart();
  }
}
