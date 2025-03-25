import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card',
  imports: [CommonModule , RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
// export class CardComponent{
  
//   constructor(private router:Router ,  private productService: ProductsService){

//   }

//   @Input() product: Product | null = null;
//   isWishlisted = false;

//   toggleWishlist(product:any) {
//     this.isWishlisted = !this.isWishlisted;
//   }

//   cardDetailsPage(product:Product) {
//     let id  = product?.product_id;
//     this.productService.productDetail.next(product);
//     this.productService.productDetails(product)
//     this.router.navigate(['/product'], { queryParams: { result: id } });
//   }
  
export class CardComponent {
  @Input() product: any;
}
