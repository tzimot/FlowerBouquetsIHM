import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopVendasPage } from './top-vendas.page';

const routes: Routes = [
  {
    path: '',
    component: TopVendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopVendasPageRoutingModule {}
