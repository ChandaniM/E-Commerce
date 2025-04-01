import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'card',
  imports: [CommonModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() product: any;
constructor(private router: Router){}
  openDetails(id:number){
    this.router.navigate(['/products', id]);
  }
}
