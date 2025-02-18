import { Component } from '@angular/core';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { CardComponent } from '../../Components/card/card.component';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from '../../Components/feature-card/feature-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent ,CarouselComponent , CommonModule , FeatureCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products =[
    {
      "name": "Multi Grain Combo Cookies",
      "description": "Healthy and delicious multi-grain cookies.",
      "price": 25,
      "image": "/images/brandlogo.png",
      "rating": 4.5,
      "sale": true,
      "grams": [],
      "layout": "portrait",
      "features": {
        "cardWidth": null,
        "button": { "show": false, "text": "" },
        "gramsTags": false,
        "input": { "show": false, "type": "" },
        "titleAlignment": "left",
        "buttonWrapper": "flex-row"
      }
    },
    {
        "name": "Multi Grain Combo Cookies",
        "description": "Healthy and delicious multi-grain cookies.",
        "price": 25,
        "image": "/images/brandlogo.png",
        "rating": 4.5,
        "sale": true,
        "grams": [],
        "layout": "portrait",
        "features": {
          "cardWidth": null,
          "button": { "show": false, "text": "" },
          "gramsTags": false,
          "input": { "show": false, "type": "" },
          "titleAlignment": "left",
          "buttonWrapper": "flex-row"
        }
      },
      {
        "name": "Multi Grain Combo Cookies",
        "description": "Healthy and delicious multi-grain cookies.",
        "price": 25,
        "image": "/images/brandlogo.png",
        "rating": 4.5,
        "sale": true,
        "grams": [],
        "layout": "portrait",
        "features": {
          "cardWidth": null,
          "button": { "show": false, "text": "" },
          "gramsTags": false,
          "input": { "show": false, "type": "" },
          "titleAlignment": "left",
          "buttonWrapper": "flex-row"
        }
      },
      {
        "name": "Multi Grain Combo Cookies",
        "description": "Healthy and delicious multi-grain cookies.",
        "price": 25,
        "image": "/images/brandlogo.png",
        "rating": 4.5,
        "sale": true,
        "grams": [],
        "layout": "portrait",
        "features": {
          "cardWidth": null,
          "button": { "show": false, "text": "" },
          "gramsTags": false,
          "input": { "show": false, "type": "" },
          "titleAlignment": "left",
          "buttonWrapper": "flex-row"
        }
      },
      {
        "name": "Multi Grain Combo Cookies",
        "description": "Healthy and delicious multi-grain cookies.",
        "price": 25,
        "image": "/images/brandlogo.png",
        "rating": 4.5,
        "sale": true,
        "grams": [],
        "layout": "portrait",
        "features": {
          "cardWidth": null,
          "button": { "show": false, "text": "" },
          "gramsTags": false,
          "input": { "show": false, "type": "" },
          "titleAlignment": "left",
          "buttonWrapper": "flex-row"
        }
      },
      {
        "name": "Multi Grain Combo Cookies",
        "description": "Healthy and delicious multi-grain cookies.",
        "price": 25,
        "image": "/images/brandlogo.png",
        "rating": 4.5,
        "sale": true,
        "grams": [],
        "layout": "portrait",
        "features": {
          "cardWidth": null,
          "button": { "show": false, "text": "" },
          "gramsTags": false,
          "input": { "show": false, "type": "" },
          "titleAlignment": "left",
          "buttonWrapper": "flex-row"
        }
      },
      {
        "name": "Multi Grain Combo Cookies",
        "description": "Healthy and delicious multi-grain cookies.",
        "price": 25,
        "image": "/images/brandlogo.png",
        "rating": 4.5,
        "sale": true,
        "grams": [],
        "layout": "portrait",
        "features": {
          "cardWidth": null,
          "button": { "show": false, "text": "" },
          "gramsTags": false,
          "input": { "show": false, "type": "" },
          "titleAlignment": "left",
          "buttonWrapper": "flex-row"
        }
      },
      {
        "name": "Multi Grain Combo Cookies",
        "description": "Healthy and delicious multi-grain cookies.",
        "price": 25,
        "image": "/images/brandlogo.png",
        "rating": 4.5,
        "sale": true,
        "grams": [],
        "layout": "portrait",
        "features": {
          "cardWidth": null,
          "button": { "show": false, "text": "" },
          "gramsTags": false,
          "input": { "show": false, "type": "" },
          "titleAlignment": "left",
          "buttonWrapper": "flex-row"
        }
      },
  ];
  categoryProduct = [
    {
      image: "/images/peaches.png",
      title: "Fruits",
      totalCount: "320",
      tag : "true",
      tagValue : "30",
      gradientColor: "linear-gradient(to bottom, #FFF6EC, #FFFFFF)" // Light Peach
    },
    {
      image: "/images/bread.png",
      title: "Bakery",
      totalCount: "320",
      tag : "true",
      tagValue : "30",
      gradientColor: "linear-gradient(to bottom, #E2FDE2, #FFFFFF)" // Light Green
    },
    {
      image: "/images/vegetable.png",
      title: "Vegetables",
      totalCount: "320",
      tag : "true",
      tagValue : "30",
      gradientColor: "linear-gradient(to bottom, #FEEAE8, #FFFFFF)" // Light Yellowish-Pink
    },
    {
      image: "/images/milk.png",
      title: "Dairy & Milk",
      totalCount: "320",
      tag : "true",
      tagValue : "30",
      gradientColor: "linear-gradient(to bottom, #FDE1F5, #FFFFFF)" // Light Pink
    },
    {
      image: "/images/french-fries.png",
      title: "Snack & Spice",
      totalCount: "320",
      tag : "true",
      tagValue : "30",
      gradientColor: "linear-gradient(to bottom, #ECF0FF, #FFFFFF)" // Light Blue
    },
    {
      image: "/images/orange-juice.png",
      title: "Juice & Drinks ",
      totalCount: "320",
      tag : "true",
      tagValue : "30",
      gradientColor: "linear-gradient(to bottom, #F9F9D9, #FFFFFF)" // Light Yellow
    }
  ];
  
}
