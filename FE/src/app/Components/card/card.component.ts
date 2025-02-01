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
  
  toggleWishlist() {
    this.isWishlisted = !this.isWishlisted;
  }
}
