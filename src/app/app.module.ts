import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ViewProductComponent } from './admin/view-product/view-product.component';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThousandSeparatorPipe } from './pipes/thousand-separator.pipe';
import { DescriptionShortenerPipe } from './pipes/description-shortener.pipe';
import { ShopsComponent } from './shops/shops.component';
import { CategoryComponent } from './admin/category/category.component';
import { ShopsSettingsComponent } from './admin/shops-settings/shops-settings.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AngularToastifyModule } from 'angular-toastify';
import { CarouselSettingsComponent } from './admin/carousel-settings/carousel-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    AdminHomeComponent,
    AddProductComponent,
    EditProductComponent,
    ViewProductComponent,
    NavbarComponent,
    ThousandSeparatorPipe,
    DescriptionShortenerPipe,
    ShopsComponent,
    CategoryComponent,
    ShopsSettingsComponent,
    LoginComponent,
    SignupComponent,
    CarouselSettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    AngularToastifyModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
],
providers: [],
bootstrap: [AppComponent]
})

export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}