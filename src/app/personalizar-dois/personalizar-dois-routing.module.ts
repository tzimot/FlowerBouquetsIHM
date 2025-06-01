import { NgModule } from '@angular/core'; // Importa decorator NgModule do Angular
import { Routes, RouterModule } from '@angular/router'; // Importa tipos e módulo para rotas

import { PersonalizarDoisPage } from './personalizar-dois.page'; // Importa o componente da página PersonalizarDois

const routes: Routes = [ // Define as rotas específicas deste módulo
  {
    path: '', // Rota vazia, URL base para esta página
    component: PersonalizarDoisPage // Componente que será exibido nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa o RouterModule configurado com as rotas deste módulo filho
  exports: [RouterModule], // Exporta o RouterModule para que outras partes da app possam usá-lo
})
export class PersonalizarDoisPageRoutingModule {} // Declara o módulo de roteamento para PersonalizarDoisPage
