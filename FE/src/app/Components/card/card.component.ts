import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() product : any;
  ngOnInit(): void {
    
  }
  // productsData: Array<Product> = [];
  // isLoading : boolean = true;
  // constructor(private readonly productServices: ProductServiceService) {
  //   console.log('constructor');
    

  //   this.productServices.getAllProductList().subscribe((res) => {
  //     if (res.length > 0) {
  //       this.productsData = res;
  //     }
  //     this.isLoading = false;
  //   });
  //   if (this.productsData.length > 0) {
  //     console.log(this.productsData);
  //   }
  // }

  // ngOnInit(): void {
  //   console.log('ngOnInit');
  // }
}
