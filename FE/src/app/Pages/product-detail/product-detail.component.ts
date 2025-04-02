import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, MatTabsModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit , OnDestroy {

  product: any = {};
  user_id = 1; // static for now
  private subscriptions = new Subscription();
  quantity: number = 1;
  maxQuantity: number = 10;

  constructor(private ps: ProductService, private route: ActivatedRoute, private router: Router , private cs:CartService) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const productSub = this.ps.productById(id).subscribe({
      next: (res: any) => {
        this.product = res['response'][0];
         const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        
        const existingProduct = cartItems.find((item: any) => item.id === this.product.id);
        
        if (existingProduct) {
          this.quantity = existingProduct.quantity;
        } else {
          this.quantity = 1; 
        }
        
        this.product['quantity'] = this.quantity;
      },
      error: (err) => {
        console.error("Error fetching product details:", err);
      },
      complete: () => {
        console.log("Product fetch complete.");
      }
    });
    this.subscriptions.add(productSub);
  }

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

  AddToCart(product:any , quantity :number) {
    let productObject = { ...product, quantity: quantity };
    this.cs.addItem(productObject);
  }

  BuyNow(product:any , quantity : number) {
    let productObject = { ...product, quantity: quantity };
    this.cs.addItem(productObject);
    this.router.navigate(['/checkout'])
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log("All subscriptions are unsubscribed");
  }
}
