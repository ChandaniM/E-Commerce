import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => { return import('./Pages/dashboard/dashboard.component').then(m => m.DashboardComponent) }
      },{
        path: 'dashboard',
        loadComponent: () => { return import('./Pages/admin-dashborad/admin-dashborad.component').then(m => m.AdminDashboradComponent) }
      },
    {
        path : "products/:id",
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
        loadComponent  :()=> { return import('./Components/user-profile/user-profile.component').then(m=>m.UserProfileComponent)}
    }
];
