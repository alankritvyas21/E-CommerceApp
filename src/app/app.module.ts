import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { SharedService } from './services/shared.service';
import { ErrorService } from './services/error.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ConfigService } from './services/config.service';
import { environment } from 'src/environments/environment';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaleItemComponent } from './components/sale-item/sale-item.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FeaturedProductsComponent,
    SaleItemComponent,
    CategoriesComponent,
    CategoryPageComponent,
    HomeComponent,
    CategoryBannerComponent,
    ProductPageComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OwlModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(environment.configFile), deps: [ConfigService], multi: true },
    SharedService,
    ErrorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
