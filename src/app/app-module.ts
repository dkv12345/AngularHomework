import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ServiceProductImageEventComponent } from './exercise-13-product-event/service-product-image-event.component';
import { ServiceProductImageEventDetailComponent } from './exercise-13-product-event/service-product-image-event-detail.component';
import { ServiceProductCatalogComponent } from './exercise-14-catalog/service-product-catalog.component';
import { ServiceGroupCustomerComponent } from './exercise-18-group-customers/service-group-customer.component';

import { ProductService } from './services/product.service';
import { CatalogService } from './services/catalog.service';
import { CustomerService } from './services/customer.service';

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ServiceProductImageEventComponent,
    ServiceProductImageEventDetailComponent,
    ServiceProductCatalogComponent,
    ServiceGroupCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    ProductService,
    CatalogService,
    CustomerService
  ],
  bootstrap: [App]
})
export class AppModule { }
