import { Component } from '@angular/core';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { CardComponent } from '../../Components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent ,CarouselComponent , CommonModule],
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
      "grams": ["250g", "500g"],
      "layout": "landscape",
      "features": {
        "cardWidth": "800px",
        "button": { "show": true, "text": "Add To Cart" },
        "gramsTags": true,
        "input": { "show": true, "type": "number" },
        "titleAlignment": "left",
        "buttonWrapper": "flex-row"
      }
    },
    {
      "name": "Newsletter",
      "description": "Subscribe to Masterkart for future updates.",
      "price": 0,
      "image": "/images/brandlogo.png",
      "rating": 0,
      "sale": false,
      "grams": [],
      "layout": "landscape",
      "features": {
        "cardWidth": null,
        "button": { "show": true, "text": "Subscribe" },
        "gramsTags": false,
        "input": { "show": true, "type": "text" },
        "titleAlignment": "center",
        "buttonWrapper": "flex-column"
      }
    }
  ]
  
}
