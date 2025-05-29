import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaEncomendaPage } from './nova-encomenda.page';

const routes: Routes = [
  {
    path: '',
    component: NovaEncomendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaEncomendaPageRoutingModule {}
