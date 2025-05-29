import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalizarTresPage } from './personalizar-tres.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalizarTresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalizarTresPageRoutingModule {}
