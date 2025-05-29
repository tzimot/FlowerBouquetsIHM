import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopVendasDoisPage } from './top-vendas-dois.page';

const routes: Routes = [
  {
    path: '',
    component: TopVendasDoisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopVendasDoisPageRoutingModule {}
