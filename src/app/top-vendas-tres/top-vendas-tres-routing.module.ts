import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopVendasTresPage } from './top-vendas-tres.page';

const routes: Routes = [
  {
    path: '',
    component: TopVendasTresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopVendasTresPageRoutingModule {}
