import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopVendasDoisPage } from './top-vendas-dois.page';

// Definição das rotas para a página TopVendasDoisPage
const routes: Routes = [
  {
    path: '', // Rota padrão para este módulo
    component: TopVendasDoisPage // Componente a carregar quando a rota for acedida
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa o RouterModule com as rotas definidas
  exports: [RouterModule], // Exporta para poder ser usado em outros módulos
})
export class TopVendasDoisPageRoutingModule {}
