import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CategoryComponent } from './admin/category/category.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ShopsSettingsComponent } from './admin/shops-settings/shops-settings.component';
import { ViewProductComponent } from './admin/view-product/view-product.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ShopsComponent } from './shops/shops.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "cart", component: CartComponent},
  {path: "shops", component: ShopsComponent},
  {path: "logi-sisse", component: LoginComponent},
  {path: "registreeru", component: SignupComponent},

  {path: "admin", canActivateChild: [AuthGuard], children: [
    {path: "", component: AdminHomeComponent},
    {path: "add", component: AddProductComponent},
    {path: "edit/:productId", component: EditProductComponent},
    {path: "view", component: ViewProductComponent},  
    {path: "category", component: CategoryComponent},
    {path: "shops-settings", component: ShopsSettingsComponent}
  ]}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// guard - saan aktiveerida mingeid URLe
// seda kasutatakse vaid app-routingu sees
