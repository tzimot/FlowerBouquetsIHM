import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalizarDoisPage } from './personalizar-dois.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalizarDoisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalizarDoisPageRoutingModule {}
