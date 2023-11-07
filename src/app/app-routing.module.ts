import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactHomeComponent } from './contact-home/contact-home.component';


const routes: Routes = [
  {path: 'contacts', component: ContactHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
