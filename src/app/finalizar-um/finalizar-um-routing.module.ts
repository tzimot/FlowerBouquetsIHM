import { NgModule } from '@angular/core'; // Importa o NgModule
import { Routes, RouterModule } from '@angular/router'; // Importa as ferramentas para configurar rotas

import { FinalizarUmPage } from './finalizar-um.page'; // Importa o componente da página FinalizarUm

const routes: Routes = [ // Define as rotas deste módulo
  {
    path: '', // Rota base (vazia) para este módulo
    component: FinalizarUmPage // Componente a carregar nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Regista as rotas como um módulo child
  exports: [RouterModule], // Exporta o módulo de rotas para ser usado externamente
})
export class FinalizarUmPageRoutingModule {} // Declara o módulo de routing para a página FinalizarUm
