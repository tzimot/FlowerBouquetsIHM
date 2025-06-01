// Este código define um módulo de rotas em Angular para a página "Cancelar",
// associando o caminho vazio ('') ao componente CancelarPage e tornando essas
// rotas disponíveis para serem usadas noutros módulos.

import { NgModule } from '@angular/core'; // Importa o decorador NgModule do Angular
import { Routes, RouterModule } from '@angular/router'; // Importa tipos e funcionalidades de routing

import { CancelarPage } from './cancelar.page'; // Importa o componente CancelarPage

const routes: Routes = [ // Define as rotas para este módulo
  {
    path: '', // Caminho vazio (rota principal desta página)
    component: CancelarPage // Componente a ser exibido nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa o RouterModule com as rotas definidas
  exports: [RouterModule], // Exporta o RouterModule para uso noutros módulos
})
export class CancelarPageRoutingModule {} // Declara o módulo de rotas da página Cancelar