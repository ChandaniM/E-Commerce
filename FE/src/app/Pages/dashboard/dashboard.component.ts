import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { CardComponent } from '../../Components/card/card.component';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from '../../Components/feature-card/feature-card.component';
import { ProductService } from '../../Services/product.service';
import { Subscription } from 'rxjs';

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
export class DashboardComponent implements OnInit  , OnDestroy{
  productService = inject(ProductService)
  isAdmin : boolean = false;
  productSubscription = new Subscription;
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
   this.isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
   if(!this.isAdmin){
     this.productSubscription = this.productService.productWrapper().subscribe({
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

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe()
    console.log("unsubscribe from user dashboard")
  }
  
}
