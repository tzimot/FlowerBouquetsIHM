import { NgModule } from '@angular/core'; // Importa NgModule do Angular
import { Routes, RouterModule } from '@angular/router'; // Importa rotas e RouterModule para configurar as rotas

import { TopVendasPage } from './top-vendas.page'; // Importa o componente da página TopVendas

const routes: Routes = [
  {
    path: '', // Rota padrão vazia (ex: /top-vendas)
    component: TopVendasPage // Componente que será carregado nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configura as rotas para este módulo usando forChild
  exports: [RouterModule], // Exporta o RouterModule para ser usado fora deste módulo
})
export class TopVendasPageRoutingModule {} // Exporta o módulo de routing para TopVendasPage
