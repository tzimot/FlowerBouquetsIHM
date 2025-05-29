import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaEncomendaUmPage } from './nova-encomenda-um.page';

const routes: Routes = [
  {
    path: '',
    component: NovaEncomendaUmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaEncomendaUmPageRoutingModule {}
