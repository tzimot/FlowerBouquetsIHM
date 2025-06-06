import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartaoPontosPage } from './cartao-pontos.page';

const routes: Routes = [
  {
    path: '',
    component: CartaoPontosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartaoPontosPageRoutingModule {}
