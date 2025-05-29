import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaEncomendaDoisPage } from './nova-encomenda-dois.page';

const routes: Routes = [
  {
    path: '',
    component: NovaEncomendaDoisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaEncomendaDoisPageRoutingModule {}
