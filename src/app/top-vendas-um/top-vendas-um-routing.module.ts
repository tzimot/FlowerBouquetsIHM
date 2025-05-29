import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopVendasUmPage } from './top-vendas-um.page';

const routes: Routes = [
  {
    path: '',
    component: TopVendasUmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopVendasUmPageRoutingModule {}
