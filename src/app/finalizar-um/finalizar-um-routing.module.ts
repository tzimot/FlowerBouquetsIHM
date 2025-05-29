import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizarUmPage } from './finalizar-um.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizarUmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizarUmPageRoutingModule {}
