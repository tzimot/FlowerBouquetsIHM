import { NgModule } from '@angular/core'; // Importa o módulo NgModule do Angular
import { Routes, RouterModule } from '@angular/router'; // Importa os tipos Routes e RouterModule para gerir rotas

import { NovaEncomendaDoisPage } from './nova-encomenda-dois.page'; // Importa o componente da página NovaEncomendaDoisPage

const routes: Routes = [ // Define as rotas para este módulo
  {
    path: '', // Caminho vazio (raiz desta rota)
    component: NovaEncomendaDoisPage // Componente que será carregado nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Regista as rotas definidas como rotas filhas
  exports: [RouterModule], // Exporta o RouterModule para que outras partes da app possam usar as rotas
})
export class NovaEncomendaDoisPageRoutingModule {} // Declara o módulo de routing para a página NovaEncomendaDoisPage
