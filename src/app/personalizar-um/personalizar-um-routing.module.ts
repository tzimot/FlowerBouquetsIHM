import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalizarUmPage } from './personalizar-um.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalizarUmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalizarUmPageRoutingModule {}
