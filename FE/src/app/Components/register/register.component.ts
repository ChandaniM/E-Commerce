import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { state } from '@angular/animations';

@Component({
  selector: 'app-register',
  imports: [MatCardModule , MatIconModule , ReactiveFormsModule , MatInputModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userForm !: FormGroup;
  isHidden : boolean  = false;
  roles = ['customer' , 'admin']
  constructor(private fb: FormBuilder , private router: Router) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      state: [''],
      address: [''],
      postal_code: [''],
      city : [''], 
      role: ['customer', Validators.required],
    });
  }

  onSubmit() {
    debugger
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      localStorage.setItem('user', JSON.stringify(this.userForm.value));
      this.router.navigate(['/login'])
    }
  }
}
