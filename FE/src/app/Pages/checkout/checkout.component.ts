import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  currentStep: number = 1;

  address = {
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zip: ''
  };

  items = [
    { name: 'Product 1', price: 20 },
    { name: 'Product 2', price: 25 }
  ];

  card = {
    number: '',
    expiry: '',
    cvv: ''
  };

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

}
