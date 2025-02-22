import { Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';

export const routes: Routes = [
    {
        path : "",
        component : DashboardComponent
    },
    {
        path : "product-details",
        component : ProductDetailComponent
    }
];
