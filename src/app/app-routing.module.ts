import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactHomeComponent } from './contact-home/contact-home.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ChartsComponent } from './charts/charts.component';


const routes: Routes = [
  {path: '', component: ChartsComponent},
  {path: 'contacts', component: ContactHomeComponent},
  {path: 'products', component: ProductHomeComponent},
  {path: 'contact/new', component: ContactNewComponent},
  {path: 'product/new', component: ProductNewComponent},
  {path: 'contact/:id', component: ContactDetailComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'contact/edit/:id', component: ContactEditComponent},
  {path: 'product/edit/:id', component: ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// npm start (codigo para iniciar)