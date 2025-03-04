import { Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { CartComponent } from './Pages/cart/cart.component';
import { WishlistComponent } from './Pages/wishlist/wishlist.component';

export const routes: Routes = [
    {
        path : "",
        loadComponent : () => { return import('./Pages/dashboard/dashboard.component').then(m=>m.DashboardComponent)}
    },
    {
        path : "product-details",
        loadComponent :  () => { return import('./Pages/product-detail/product-detail.component').then(m=>m.ProductDetailComponent)}
    },
    {
        path :"login",
        loadComponent :  () => { return import('./Components/login/login.component').then(m=>m.LoginComponent)}
    },
    {
        path : "register",
        loadComponent :  () => { return import('./Components/register/register.component').then(m=>m.RegisterComponent)}
    },
    {
        path:"checkout",
        loadComponent :  () => { return import('./Pages/checkout/checkout.component').then(m=>m.CheckoutComponent)}
    },
    {
        path:"cart",
        loadComponent :  () => { return import('./Pages/cart/cart.component').then(m=>m.CartComponent)}  
    },
    {
        path :"Wishlist",
        loadComponent :  () => { return import('./Pages/wishlist/wishlist.component').then(m=>m.WishlistComponent)}
    },
    {
        path : "user-profile",
        loadComponent  :()=> { return import('./Components/user-profile/user-profile.component').then(m=>m.UserProfileComponent)},
        data: { isAdmin: true }

    }
];
