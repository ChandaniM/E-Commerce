import { Component, OnInit } from '@angular/core';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Route, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'navbar',
  imports: [CartSidebarComponent , CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit{
  isSelectComponent = ""
  isDropdownOpen = false;
  isLoggedIn = false;
  cartElementCount : number = 0
  user = { name: 'John Doe', email: 'johndoe@example.com' }; // Example user data
  constructor(private route : Router , private cs : CartService , private us :UsersService){
    
  }
  ngOnInit(): void {
    this.isLoggedIn = JSON.parse(localStorage.getItem("isLogin") || "false");
    console.log(this.isLoggedIn);
    
    this.cs.data$.subscribe(cartItems => {
      this.cartElementCount = cartItems.length;
    });
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  login() {
    this.isLoggedIn = JSON.parse(localStorage.getItem("isLogin") || "false");
    console.log(this.isLoggedIn);
     this.toggleDropdown();
     this.route.navigate(['/login'])
  }

  logout() {
    this.isLoggedIn = JSON.parse(localStorage.getItem("isLogin") || "false");
    console.log(this.isLoggedIn , "this is for testing");
    
    this.toggleDropdown();
    this.us.logout()
  }
  openUserProfile(){
   this.route.navigate(['/user-profile'])
    console.log('this.openUserProfile');
    
  }
}
