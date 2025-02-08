import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { ProductdetailComponent } from './Pages/productdetail/productdetail.component';
import { AddToCartComponent } from './Pages/add-to-cart/add-to-cart.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'sign-up',
    component :SignUpComponent
  },
  {
    path:'product',
    component: ProductdetailComponent
  },
  {
    path:"addtocart",
    component:AddToCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
