import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseMapperServiceService } from '../../Services/response-mapper-service.service';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  
    @Input() formFields: any[] = []; // Parent se data aayega
    userForm: FormGroup = new FormGroup({});
    @Output() formSubmitted = new EventEmitter<any>();
    constructor(private fb: FormBuilder , private mapperService : ResponseMapperServiceService) {}
    ngOnInit() {
      // this.mapperService.userDetailsSub.subscribe(userDetails => {
      //   if (userDetails) {
      //     this.patchFormValues(userDetails);
      //   }
      // });
  
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
        this.userForm.addControl(field.name, this.fb.control(field.value || '', validators)); // Default value set
      });
    }
  
    patchFormValues(data: any) {
      if (this.userForm) {
        this.userForm.patchValue(data);
      }
    }
  
    onSubmit() {
      if (this.userForm.valid) {
        console.log(this.userForm.value);
        alert('Form Submitted Successfully 🎯');
        this.formSubmitted.emit(this.userForm.value)
      } else {
        alert('Please fill all required fields');
      }
    }
    onFileChange(event: any) {
      const file = event.target.files[0];
      console.log('Selected File:', file);
    }
}
