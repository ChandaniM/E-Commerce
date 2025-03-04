import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  images = [
    { 
      image: '/images/banner_image_1.jpg', 
      text: 'Organic & healthy vegetables'
    },
    { 
      image: '/images/banner_image_2.jpg', 
      text: 'Explore fresh & juicy fruits'
    }
  ];

  currentImage = 0;
  interval: any;

  constructor() {
    this.startCarousel();
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.nextImage();
    }, 5000); 
  }

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  prevImage() {
    this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
  }

  goToImage(index: number) {
    this.currentImage = index;
  }

}
