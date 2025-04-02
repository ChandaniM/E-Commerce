import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent {
   productSizes = [
    "XS", // Extra Small
    "S",  // Small
    "M",  // Medium
    "L",  // Large
    "XL", // Extra Large
    "XXL" // Double Extra Large
  ];
  
  product: Product | null = null;  // Product data
  private productSubscription: Subscription;

  constructor(private productService: ProductsService) {
    this.productSubscription =  this.productService.productDetail.subscribe((product:any)=>{
      this.product = product.length > 0  ? product : this.productService.productDetailsFromStorage()
    })
  }

  ngOnInit(): void {
    // The product will be updated automatically via the subscription
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.productSubscription.unsubscribe();
  }

  quantity: number = 1; // Default quantity
  maxQuantity: number = 10; // Max allowed quantity for this product

  // Decrease the quantity (ensuring it doesn't go below 1)
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Increase the quantity (ensuring it doesn't exceed maxQuantity)
  increaseQuantity() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  addToCart(product:any , quantity:number){
    let addtocart = {
     ... product ,
     quantity : quantity
    }
    console.log(addtocart , "addtocart")
    debugger
    this.productService.setaddtocartProduct(addtocart)
    
  }
  
}
