import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, MatTabsModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  product: any = {};
  user_id = 1; // static for now

  quantity: number = 1;
  maxQuantity: number = 10;

  constructor(private ps: ProductService, private route: ActivatedRoute, private router: Router , private cs:CartService) {}

 ngOnInit(): void {
  const id = this.route.snapshot.params['id'];
  this.ps.productById(id).subscribe((res: any) => {
    this.product = res['response'][0];
  });
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
}
