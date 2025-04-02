import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Helper } from '../../helpers/helper';

@Component({
  selector: 'category',
  imports: [ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, OnChanges, OnDestroy {
  categoryArray: any[] = [];
  addCategoryForm !: FormGroup;
  private categorySubscription!: Subscription;
  private addCategorySubscription!: Subscription;
  constructor(private FB: FormBuilder, private categoryServices: CategoryService  , private helper : Helper) {

  }
  ngOnInit(): void {
    this.initializeForm();
    this.getAllCategory();
  }

  initializeForm() {
    this.addCategoryForm = this.FB.group({
      main_category_name: ['', Validators.required],
      name: ['', Validators.required],
      slug: ['', Validators.required],
      description: [''],
      tags: [''],
      is_active: [true],
    })
  }
  getAllCategory() {
    this.categorySubscription = this.categoryServices.getAllCategory().subscribe({
      next : (category) => {
        if (category.type == "success") {
          this.categoryArray = [...category.response];
        }
      },
      error: (err) => {
        console.error("API Error:", err);
      }
  })
    console.log(this.categoryArray, 'category')
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
      console.log('Unsubscribed from getAllCategory');
    }
    if (this.addCategorySubscription) {
      this.addCategorySubscription.unsubscribe();
      console.log('Unsubscribed from addCategory');
    }

  }

  submitCategory() {
    if (this.addCategoryForm.valid) {
      console.log('Form Submitted:', this.addCategoryForm.value);
      this.AddNewCategory(this.addCategoryForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
  AddNewCategory(category: object) {
    this.addCategorySubscription = this.categoryServices.addCategory(category).subscribe({
      next: (value) => {
        this.helper.showMessage(value.message, value.type === "success" ? "success" : "error");
        this.getAllCategory();
      },
      error: (err) => {
        console.error("API Error:", err);
        const errorMessage = err?.error?.message || "Something went wrong. Please try again later.";
        this.helper.showMessage(errorMessage, "error");
      }
    });
    
  }
  edit(category:any){
    console.log(category)
    this.addCategoryForm.patchValue({
      
    })
  }
  delete(id:number){
    this.categoryServices.deleteCategory(id).subscribe({
      next: (res) => {
        this.helper.showMessage(res.message, res.type === "success" ? "success" : "error");
        this.getAllCategory();
      },
      error: (err) => {
        console.error("API Error:", err);
        const errorMessage = err?.error?.message || "Something went wrong. Please try again later.";
        this.helper.showMessage(errorMessage, "error");
      }
    });
  }
}
