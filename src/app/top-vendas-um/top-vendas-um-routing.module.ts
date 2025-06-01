import { NgModule } from '@angular/core'; // Importa NgModule do Angular para definir módulos
import { Routes, RouterModule } from '@angular/router'; // Importa tipos e módulo de rotas para navegação

import { TopVendasUmPage } from './top-vendas-um.page'; // Importa o componente da página TopVendasUm

const routes: Routes = [ // Define as rotas deste módulo
  {
    path: '', // Rota vazia, ou seja, rota base deste módulo
    component: TopVendasUmPage // Componente a carregar nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa o RouterModule configurado com as rotas deste módulo
  exports: [RouterModule], // Exporta o RouterModule para que outras partes possam usar as rotas definidas aqui
})
export class TopVendasUmPageRoutingModule {} // Declara o módulo de routing para a página TopVendasUm
