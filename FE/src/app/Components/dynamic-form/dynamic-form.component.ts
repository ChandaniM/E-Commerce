import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  
    @Input() formFields: any[] = []; // Parent se data aayega
    userForm: FormGroup = new FormGroup({});
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit() {
      this.createForm();
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['formFields'] && this.formFields.length > 0) {
        this.createForm();
      }
    }
  
    createForm() {
      this.userForm = this.fb.group({});
      this.formFields.forEach(field => {
        const validators = field.required ? [Validators.required] : [];
        this.userForm.addControl(field.name, this.fb.control('', validators));
      });
    }
  
    onSubmit() {
      if (this.userForm.valid) {
        console.log(this.userForm.value);
        alert('Form Submitted Successfully 🎯');
      } else {
        alert('Please fill all required fields');
      }
    }
    onFileChange(event: any) {
      const file = event.target.files[0];
      console.log('Selected File:', file);
    }
}
