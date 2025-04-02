import { CommonModule } from '@angular/common';
import { Component, HostBinding, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss',
})
export class CartSidebarComponent implements OnInit, OnDestroy {
  @HostBinding('class.open') isOpen = false;
  cartItems: any[] = [];
  private subscriptions = new Subscription(); // ✅ Properly initialized

  constructor(
    private cdr: ChangeDetectorRef, 
    private cs: CartService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cs.data$.subscribe((data) => {
        this.cartItems = data;
        console.log(this.cartItems, "Updated Cart Items");
        this.cdr.detectChanges();
      })
    );
  }

  toggleCart() {
    this.isOpen = !this.isOpen;
    this.cdr.detectChanges();
  }

  removeItem(index: number) {
    this.cs.removeItem(index);
  }

  checkout() {
    console.log("Proceeding to checkout...");
    this.router.navigate(['/checkout']);
  }

  getSubTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + Number((item.discount_price * item.quantity) || 0), 0);
  }

  getTotal(): number {
    const subTotal = this.getSubTotal();
    return subTotal + (subTotal * 0.10); 
  }
  viewCart(){}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log("✅ CartSidebarComponent destroyed, all subscriptions unsubscribed.");
  }
}
