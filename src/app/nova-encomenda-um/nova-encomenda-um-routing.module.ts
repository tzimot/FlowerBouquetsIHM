import { NgModule } from '@angular/core'; // Importa o decorador NgModule
import { Routes, RouterModule } from '@angular/router'; // Importa os módulos de routing do Angular

import { NovaEncomendaUmPage } from './nova-encomenda-um.page'; // Importa o componente da página

const routes: Routes = [ // Define as rotas para este módulo
  {
    path: '', // Caminho vazio corresponde à rota base deste módulo
    component: NovaEncomendaUmPage // Componente que será renderizado nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa as rotas como um módulo filho
  exports: [RouterModule], // Exporta o RouterModule para que fique disponível para outros módulos
})
export class NovaEncomendaUmPageRoutingModule {} // Declaração da classe do módulo de routing
