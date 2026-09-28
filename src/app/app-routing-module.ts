import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiceProductImageEventComponent } from './exercise-13-product-event/service-product-image-event.component';
import { ServiceProductImageEventDetailComponent } from './exercise-13-product-event/service-product-image-event-detail.component';
import { ServiceProductCatalogComponent } from './exercise-14-catalog/service-product-catalog.component';
import { ServiceGroupCustomerComponent } from './exercise-18-group-customers/service-group-customer.component';

export const routes: Routes = [
  // Home / Overview Route
  { 
    path: '', 
    component: HomeComponent, 
    pathMatch: 'full',
    title: 'Angular Homework Showcase | UEL'
  },

  // Exercise 13 Routes (Exact paths from Exercise Handout)
  { 
    path: 'service-product-image-event', 
    component: ServiceProductImageEventComponent,
    title: 'Exercise 13 - Product List & Events'
  },
  { 
    path: 'service-product-image-event/:id', 
    component: ServiceProductImageEventDetailComponent,
    title: 'Exercise 13 - Product Details'
  },

  // Exercise 14 Routes (Exact specification from Exercise Handout)
  { 
    path: 'service-product-catalog', 
    component: ServiceProductCatalogComponent,
    title: 'Exercise 14 - Product Catalog'
  },

  // Exercise 18 Routes (Exact specification from Exercise Handout)
  { 
    path: 'service-group-customer', 
    component: ServiceGroupCustomerComponent,
    title: 'Exercise 18 - Group Customers (HTTP)'
  },

  // Convenient Aliases for testing & review
  { 
    path: 'exercise-13', 
    redirectTo: 'service-product-image-event', 
    pathMatch: 'full' 
  },
  { 
    path: 'exercise-14', 
    redirectTo: 'service-product-catalog', 
    pathMatch: 'full' 
  },
  { 
    path: 'exercise-18', 
    redirectTo: 'service-group-customer', 
    pathMatch: 'full' 
  },
  { 
    path: 'products', 
    redirectTo: 'service-product-image-event', 
    pathMatch: 'full' 
  },
  { 
    path: 'products/:id', 
    component: ServiceProductImageEventDetailComponent 
  },
  { 
    path: 'catalog', 
    redirectTo: 'service-product-catalog', 
    pathMatch: 'full' 
  },
  { 
    path: 'customers', 
    redirectTo: 'service-group-customer', 
    pathMatch: 'full' 
  },

  // Catch-all wildcard
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }