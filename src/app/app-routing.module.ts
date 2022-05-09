import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CategoryComponent } from './admin/category/category.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ShopsSettingsComponent } from './admin/shops-settings/shops-settings.component';
import { ViewProductComponent } from './admin/view-product/view-product.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ShopsComponent } from './shops/shops.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "cart", component: CartComponent},
  {path: "admin", component: AdminHomeComponent},
  {path: "admin/add", component: AddProductComponent},
  {path: "admin/edit/:productId", component: EditProductComponent},
  {path: "admin/view", component: ViewProductComponent},
  {path: "shops", component: ShopsComponent},
  {path: "admin/category", component: CategoryComponent},
  {path: "admin/shops-settings", component: ShopsSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
