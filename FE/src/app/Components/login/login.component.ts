import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { UsersService } from '../../Services/users.service';
import { Helper } from '../../helpers/helper';

@Component({
  selector: 'app-login',
  imports: [MatCardModule , MatIconModule , ReactiveFormsModule , MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,private route: Router , private loginService : UsersService , private helper : Helper) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.loginService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response.type === 'success') {
            const isAdmin = response.user.some((user: any) => user.role === 'admin');
            localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
            this.helper.showMessage(response.message, "success");
            localStorage.setItem("isLogin" , JSON.stringify(true));
            this.route.navigate(['']);
          }
        },
        error: (err) => {
          console.error("API Error:", err);
          const errorMessage = err?.error?.message || "Something went wrong. Please try again later.";
          this.helper.showMessage(errorMessage, "error");
        }
      });
      
    }
  }

  goToSignUp(){
    this.route.navigate(['/register']);
  }
}
