import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DetailComponent } from './product/detail/detail.component';
import { ViewComponent } from './product/view/view.component';
import { KeepValueComponent } from './keep-value/keep-value.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'product/:id',
    component: DetailComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
  {
    path: 'keep',
    component: KeepValueComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
