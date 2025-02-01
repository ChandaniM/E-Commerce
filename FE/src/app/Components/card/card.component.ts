import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{
  @Input() product: Product | null = null;
  isWishlisted = false;
  // ngOnInit(): void {
    
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['product'] && changes['product'].currentValue) {
  //     console.log('Current Value:', changes['product'].currentValue);
  //     console.log('Previous Value:', changes['product'].previousValue);
  //   }
  // }
  // ngOnDestroy(): void {
    
  // }
  toggleWishlist() {
    this.isWishlisted = !this.isWishlisted;
  }
}
