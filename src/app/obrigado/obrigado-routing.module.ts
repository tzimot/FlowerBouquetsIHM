import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObrigadoPage } from './obrigado.page';

const routes: Routes = [
  {
    path: '',
    component: ObrigadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObrigadoPageRoutingModule {}
