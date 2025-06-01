import { NgModule } from '@angular/core'; // Importa NgModule para definir módulos Angular
import { Routes, RouterModule } from '@angular/router'; // Importa rotas e roteador do Angular

import { NovaEncomendaTresPage } from './nova-encomenda-tres.page'; // Importa o componente da página

const routes: Routes = [ // Define as rotas para este módulo
  {
    path: '', // Rota vazia corresponde ao componente principal
    component: NovaEncomendaTresPage // Define o componente para esta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa as rotas como rotas filhas
  exports: [RouterModule], // Exporta o roteador para ser usado fora deste módulo
})
export class NovaEncomendaTresPageRoutingModule {} // Declara o módulo de routing da página
