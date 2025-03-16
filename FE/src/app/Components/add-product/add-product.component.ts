import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../model/product.type';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(private productService:ProductService , public fb : FormBuilder){
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      Supplier: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      fullDetail: [''],
      tags: [''],
      profileImage: [null],
    });
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.productForm.patchValue({ profileImage: file });
  }

  onCheckboxChange(e: any) {
    debugger
    const sizes = this.productForm.controls['sizes'].value;
    if (e.target.checked) {
      sizes.push(e.target.value);
    } else {
      const index = sizes.indexOf(e.target.value);
      if (index > -1) {
        sizes.splice(index, 1);
      }
    }
    this.productForm.patchValue({ sizes });
  }

  submitForm() {
    if (this.productForm.valid) {
      console.log('Form Data:', this.productForm.value);
      alert('Product Submitted Successfully!');
    } else {
      alert('Fill all required fields!');

    
  }
  }
}
