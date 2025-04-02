import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../model/product.type';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { Subscription } from 'rxjs';
import { Helper } from '../../helpers/helper';

@Component({
  selector: 'add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit , OnDestroy {
  productForm: FormGroup;
@Output() callParent = new EventEmitter();
  private categorySubscription!: Subscription;
  categoryArray :any[] = []
  constructor(private helper : Helper , private productService :ProductService , public fb : FormBuilder , private categoryService : CategoryService ){
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      Supplier: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      fullDetail: [''],
      tags: [''],
      total_cost :[0],
      on_sale:[false],
      profileImage: [null],
    });
  }

    ngOnInit(): void {
      this.getCategorydropdownValue();

    }


  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }
 selectedCategoryDropdown: { label: any; value : any }[] = []
  getCategorydropdownValue(){
  this.categorySubscription = this.categoryService.getAllCategory().subscribe({
      next: (category) => {
        const categoryMap = category.response.reduce((acc: any, e: any) => {
          if (!acc[e.main_category_name]) {
            acc[e.main_category_name] = {
              label: e.main_category_name,
              value: [e.name], 
            };
          } else {
            acc[e.main_category_name].value.push(e.name);
          }
          return acc;
        }, {});
        
        this.selectedCategoryDropdown = Object.values(categoryMap);
        console.log(this.selectedCategoryDropdown, "selectedCategoryDropdown");
        this.categoryArray = category.response;
      },
      error: (err) => {
        console.error("Error fetching categories:", err);
      },
      complete: () => {
        console.log("Category fetching complete.");
      }
    });
    
    console.log(this.selectedCategoryDropdown, "selectedCategoryDropdown");
    
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
    if (!this.productForm.valid) {
      alert("Fill all required fields!");
      return;
    }
  
    const formValues = this.productForm.value;  
    const category = this.getCategoryByName(formValues.category?.trim());
    
    // Calculate and update total cost
    const totalCost = this.getTotalCost(formValues.quantity, formValues.price);
    this.productForm.patchValue({
      total_cost: this.getFormattedCurrency(totalCost),
    });
  
    const submitProduct = {
      name: formValues.productName,
      short_title: formValues.shortTitle,  // Corrected field
      category_id: category?.id || 0,  // Default to 0 if null
      brand: formValues.Supplier,
      sku: `${formValues.productName}-${formValues.Supplier}`, // Fixed `brand` reference
      actual_price: formValues.price,
      stock_quantity: formValues.quantity,
      description: formValues.description,
      detail_description: formValues.fullDetail,
      user_id: 5,  
      img_link: formValues.profileImage,
      product_link: formValues.profileImage,
      on_sale: formValues.on_sale ? 1 : 0,  // Boolean to integer
      discount_percentage: formValues.discount_percentage || 0,  // Ensure value is set
    };
  
    console.log("Submitting Product:", submitProduct);
  
    this.productService.addProduct(submitProduct).subscribe({
      next:  (response: any) => {
        console.log("Product added successfully:", response);
        this.productService.getAllProduct().subscribe((product:any)=>{
          this.helper.showMessage(response.message , response.type == "success" ? response.type : "error" );
          this.callParent.emit({type:"product-table"})
          alert("Product Submitted Successfully!");
        })
      },
      error:  (error) => {
        console.error("Error submitting product:", error);
        alert("Failed to submit product. Please try again.");
      }
    }
    );
  }

  onCategoryChange(event: any) {
    if (event.target.value === "add_new") {
        this.addNewCategory(); 
        event.target.value = "";
    }
}

  addNewCategory(){
    this.callParent.emit({type: "category"})
  }
  getCategoryByName(name: string) {
    return this.categoryArray.find((e: any) => e.name === name) || null;
  }
  getTotalCost(quanity :number , pricePerItem:number){
   let value = this.helper.calculateTotalCost(quanity , pricePerItem);
    console.log(value , "check")
    return value != undefined ? value : 0;
  }

  getFormattedCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
  }
  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe()

  }
}
