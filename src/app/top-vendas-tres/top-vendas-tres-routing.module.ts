import { NgModule } from '@angular/core'; // Importa o decorador NgModule do Angular
import { Routes, RouterModule } from '@angular/router'; // Importa os tipos Routes e RouterModule para configurar rotas

import { TopVendasTresPage } from './top-vendas-tres.page'; // Importa o componente da página TopVendasTresPage

const routes: Routes = [ // Declara um array de rotas para este módulo
  {
    path: '', // Define o caminho vazio (raiz desta rota)
    component: TopVendasTresPage // Associa este caminho ao componente TopVendasTresPage
  }
];

@NgModule({ // Declara um módulo Angular
  imports: [RouterModule.forChild(routes)], // Importa o RouterModule configurado com as rotas definidas, usando forChild para módulos filhos
  exports: [RouterModule], // Exporta o RouterModule para que esteja disponível fora deste módulo
})
export class TopVendasTresPageRoutingModule {} // Exporta a classe do módulo de routing da página TopVendasTresPage
