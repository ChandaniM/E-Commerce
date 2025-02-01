import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    this.router.navigate(['/sign-up']);

  }
}
