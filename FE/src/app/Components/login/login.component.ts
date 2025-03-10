import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatCardModule , MatIconModule , ReactiveFormsModule , MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,private router: Router) {
    this.loginForm = this.fb.group({
      _username: ['', [Validators.required, Validators.minLength(3)]],
      get username_1() {
        return this._username;
      },
      set username_1(value) {
        this._username = value;
      },
      get username() {
        return this._username;
      },
      set username(value) {
        this._username = value;
      },
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }
  }

  goToSignUp(){
    this.router.navigate(['/register']);
  }
}
