import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'form', component: ProductFormComponent }
];
