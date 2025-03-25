import { CommonModule } from '@angular/common';
import { Component, HostBinding, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'cart-sidebar',
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss',
})
export class CartSidebarComponent {
  @HostBinding('class.open') isOpen = false;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleCart() {
    this.isOpen = !this.isOpen;
    this.cdr.detectChanges();
  }
  checkout(){

  }
  viewCart(){
    
  }
}
