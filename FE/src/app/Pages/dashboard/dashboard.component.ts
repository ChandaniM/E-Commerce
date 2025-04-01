import { Component, inject, OnInit } from '@angular/core';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { CardComponent } from '../../Components/card/card.component';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from '../../Components/feature-card/feature-card.component';
import { Product } from '../../model/product.type';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardComponent, 
    CarouselComponent, 
    CommonModule, 
    FeatureCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  productService = inject(ProductService)
  
  products :any[] = [
  ];
  categoryProduct = [
    {
      image: "/images/peaches.png",
      title: "Fruits",
      totalCount: "320",
      tag: "true",
      tagValue: "30",
      gradientColor: "linear-gradient(to bottom, #FFF6EC, #FFFFFF)" // Light Peach
    },
    {
      image: "/images/bread.png",
      title: "Bakery",
      totalCount: "320",
      tag: "true",
      tagValue: "30",
      gradientColor: "linear-gradient(to bottom, #E2FDE2, #FFFFFF)" // Light Green
    },
    {
      image: "/images/vegetable.png",
      title: "Vegetables",
      totalCount: "320",
      tag: "true",
      tagValue: "30",
      gradientColor: "linear-gradient(to bottom, #FEEAE8, #FFFFFF)" // Light Yellowish-Pink
    },
    {
      image: "/images/milk.png",
      title: "Dairy & Milk",
      totalCount: "320",
      tag: "true",
      tagValue: "30",
      gradientColor: "linear-gradient(to bottom, #FDE1F5, #FFFFFF)" // Light Pink
    },
    {
      image: "/images/french-fries.png",
      title: "Snack & Spice",
      totalCount: "320",
      tag: "true",
      tagValue: "30",
      gradientColor: "linear-gradient(to bottom, #ECF0FF, #FFFFFF)" // Light Blue
    },
    {
      image: "/images/orange-juice.png",
      title: "Juice & Drinks ",
      totalCount: "320",
      tag: "true",
      tagValue: "30",
      gradientColor: "linear-gradient(to bottom, #F9F9D9, #FFFFFF)" // Light Yellow
    }
  ];

  ngOnInit(): void {
    this.productService.productWrapper().subscribe({
      next: (res) => {
        this.products = [...res];
      },
      error: (err) => {
        console.error('Error while fetching products:', err);
      },
      complete: () => {
        console.log('Product fetching completed.');
      }
    });
    
  }
  
}
