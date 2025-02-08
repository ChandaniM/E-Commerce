import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{
  
  constructor(private router:Router ,  private productService: ProductsService){

  }

  @Input() product: Product | null = null;
  isWishlisted = false;

  toggleWishlist(product:any) {
    this.isWishlisted = !this.isWishlisted;
  }

  cardDetailsPage(product:Product) {
    let id  = product?.product_id;
    this.productService.productDetail.next(product);
    this.productService.productDetails(product)
    this.router.navigate(['/product'], { queryParams: { result: id } });
  }
  
}
