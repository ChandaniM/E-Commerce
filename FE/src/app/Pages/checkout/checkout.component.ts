import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../Services/cart.service';
import { Helper } from '../../helpers/helper';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderSuccessComponentComponent } from '../../Components/order-success-component/order-success-component.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  cartItems: any[] = [];
  currentStep = 1;
  readonly dialog = inject(MatDialog);
  isAddressSaved = false;
  savedAddress: any = null;
  isFormValid = false;
  private subscriptions = new Subscription();

  constructor(private fb: FormBuilder, private cs: CartService, private helper: Helper) {
    this.checkoutForm = this.fb.group({
      address: this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
      }),
      orderSummary: this.fb.group({
        items: [[], Validators.required],
        count: [0, Validators.required],
        total: [0, Validators.required]
      }),
      payment: this.fb.group({
        cardNumber: ['', [
          Validators.required,
          Validators.pattern('^([0-9]{4} ?){3}[0-9]{4}$')
        ]],
        expiry: ['', [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\/\d{2}$')
        ]],
        cvv: ['', [
          Validators.required,
          Validators.pattern('^[0-9]{3}$')
        ]]
      })
    });
  }

  ngOnInit(): void {
    this.cartItems = this.cs.getData();
    this.updateOrderSummary();

    const savedData = JSON.parse(localStorage.getItem("cartdetails") || '{}');
    if (savedData.address) {
      this.checkoutForm.get('address')?.patchValue(savedData.address);
    }
    if (savedData.payment) {
      this.checkoutForm.get('payment')?.patchValue(savedData.payment);
    }

    this.checkFormValidity();

    this.subscriptions.add(this.cs.data$.subscribe(() => {
        this.cartItems = this.cs.getData();
        this.updateOrderSummary();
      })
    );

    this.subscriptions.add(
      this.checkoutForm.valueChanges.subscribe(() => this.checkFormValidity())
    );
  }

  checkFormValidity() {
    const formValue = this.checkoutForm.value;
    this.isFormValid = !!(
      formValue.address.fullName &&
      formValue.address.email &&
      formValue.address.phone &&
      formValue.address.city &&
      formValue.address.state &&
      formValue.address.zip &&
      formValue.orderSummary.items.length > 0 &&
      formValue.orderSummary.count > 0 &&
      formValue.orderSummary.total > 0 &&
      formValue.payment.cardNumber &&
      formValue.payment.expiry &&
      formValue.payment.cvv
    );
  }

  updateOrderSummary() {
    this.checkoutForm.get('orderSummary')?.patchValue({
      items: this.cartItems.map(item => ({
        name: item.name,
        price: item.discount_price,
        quantity: item.quantity,
        id: item.id
      })),
      count: this.cartItems.length,
      total: this.getTotal()
    });
    this.checkoutForm.get('orderSummary')?.updateValueAndValidity();
  }

  trash(id: number) {
    this.cs.removeItem(id);
  }

  onSubmit(): void {
    if (this.isFormValid) {
      localStorage.setItem("cartdetails", JSON.stringify(this.checkoutForm.value));
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OrderSuccessComponentComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(() => {
      document.getElementById('someVisibleButton')?.focus();
    });

  }

  get addressForm(): FormGroup {
    return this.checkoutForm.get('address') as FormGroup;
  }

  get paymentForm(): FormGroup {
    return this.checkoutForm.get('payment') as FormGroup;
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + Number(item.discount_price), 0);
  }

  onCardInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const formattedValue = this.formatCardNumber(inputElement.value);
    this.paymentForm.get('cardNumber')?.patchValue(formattedValue, { emitEvent: false });
  }

  formatCardNumber(value: string): string {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  goToStep(step: number) {
    this.currentStep = step;
  }
  saveAddress() {
    if (this.addressForm.valid) {
      this.savedAddress = this.addressForm.value;
      this.isAddressSaved = true;
    }
  }

  editAddress() {
    this.isAddressSaved = false;
    this.addressForm.setValue(this.savedAddress);
  }
  nextStep() {
    if (this.currentStep === 2 && this.cartItems.length === 0) {
      alert('Your cart is empty. Please add items before proceeding.');
      return;
    }
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log("✅ CheckoutComponent destroyed, all subscriptions unsubscribed.");
  }
}
