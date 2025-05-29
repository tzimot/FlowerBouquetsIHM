import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaEncomendaTresPage } from './nova-encomenda-tres.page';

const routes: Routes = [
  {
    path: '',
    component: NovaEncomendaTresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaEncomendaTresPageRoutingModule {}
