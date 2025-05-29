import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelarPage } from './cancelar.page';

const routes: Routes = [
  {
    path: '',
    component: CancelarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelarPageRoutingModule {}
