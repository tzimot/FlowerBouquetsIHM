import { NgModule } from '@angular/core'; // Importa o decorator NgModule do Angular
import { Routes, RouterModule } from '@angular/router'; // Importa tipos e módulos para rotas

import { NovaEncomendaPage } from './nova-encomenda.page'; // Importa o componente da página NovaEncomenda

const routes: Routes = [ // Define as rotas para este módulo
  {
    path: '', // Caminho vazio corresponde à rota base desta página
    component: NovaEncomendaPage // Associa o componente NovaEncomendaPage a esta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa as rotas definidas para o módulo filho
  exports: [RouterModule], // Exporta o RouterModule para usar as rotas noutros módulos
})
export class NovaEncomendaPageRoutingModule {} // Declara o módulo de roteamento para a página NovaEncomenda
