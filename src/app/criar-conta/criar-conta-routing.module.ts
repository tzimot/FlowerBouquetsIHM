import { NgModule } from '@angular/core'; // Importa o NgModule
import { Routes, RouterModule } from '@angular/router'; // Importa funcionalidades para configurar rotas

import { CriarContaPage } from './criar-conta.page'; // Importa o componente da página CriarConta

const routes: Routes = [ // Define as rotas deste módulo
  {
    path: '', // Rota principal deste módulo
    component: CriarContaPage // Componente que será exibido nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Regista as rotas usando forChild porque é um módulo child
  exports: [RouterModule], // Exporta o RouterModule para que outros módulos possam usá-lo
})
export class CriarContaPageRoutingModule {} // Declara o módulo de routing para a página CriarConta
