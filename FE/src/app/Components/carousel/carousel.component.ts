import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  slides = [
    { 
      image: '/images/brandlogo.png', 
      text: 'First Slide Caption'
    },
    { 
      image: '/images/login.jpg', 
      text: 'Second Slide Caption'
    },
    { 
      image: '/images/sign-up.jpg', 
      text: 'Third Slide Caption'
    }
  ];

}
