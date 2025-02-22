import { Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

export const routes: Routes = [
    {
        path : "",
        component : DashboardComponent
    },
    {
        path : "product-details",
        component : ProductDetailComponent
    },
    {
        path :"login",
        component : LoginComponent
    },
    {
        path : "register",
        component:RegisterComponent
    }
];
