import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtrosComponent } from './pages/otros/otros.component';
import { InformacionComponent } from './pages/informacion/informacion.component';

const routes: Routes = [
  {
    path:"clientes",
    component: InformacionComponent
  },
  {
    path:"",
    component: InformacionComponent
  },
  {
    path:"otros",
    component: OtrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
