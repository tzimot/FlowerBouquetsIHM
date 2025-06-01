import { NgModule } from '@angular/core'; 
// Importa o decorator NgModule para definir um módulo Angular

import { Routes, RouterModule } from '@angular/router'; 
// Importa tipos e funcionalidades para definir rotas e gerir navegação

import { PersonalizarUmPage } from './personalizar-um.page'; 
// Importa o componente da página PersonalizarUmPage para associar à rota

const routes: Routes = [
  {
    path: '', 
    // Rota padrão (vazia), quando se acede a este módulo
    component: PersonalizarUmPage 
    // Define que este caminho vai carregar o componente PersonalizarUmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  // Importa o módulo de rotas configurado para este módulo filho
  exports: [RouterModule], 
  // Exporta RouterModule para estar disponível para quem importar este módulo
})
export class PersonalizarUmPageRoutingModule {} 
// Exporta o módulo de routing para PersonalizarUmPage
