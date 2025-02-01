import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , OnChanges , OnDestroy {
  products: Product[] = [];
  constructor (private productService : ProductsService){
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnDestroy(): void {
    
  }
}
