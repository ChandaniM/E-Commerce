import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  Product,
  ProductServiceService,
} from '../../Services/product-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Array<Product> = [];
  isLoading: boolean = true;
  constructor(private readonly productServices: ProductServiceService) {
    console.log('constructor');

    this.productServices.getAllProductList().subscribe((res) => {
      if (res.length > 0) {
        this.products = res;
      }
      this.isLoading = false;
    });
    if (this.products.length > 0) {
      console.log(this.products);
    }
  }
}
