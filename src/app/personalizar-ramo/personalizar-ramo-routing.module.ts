import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalizarRamoPage } from './personalizar-ramo.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalizarRamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalizarRamoPageRoutingModule {}
