import { NgModule } from '@angular/core'; // Importa o decorador NgModule
import { Routes, RouterModule } from '@angular/router'; // Importa classes para definição e gestão de rotas

import { ObrigadoPage } from './obrigado.page'; // Importa o componente da página Obrigado

const routes: Routes = [
  {
    path: '', // Rota vazia significa o caminho base deste módulo
    component: ObrigadoPage // Componente que será carregado nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Regista as rotas usando forChild (porque é um módulo de feature)
  exports: [RouterModule], // Exporta o RouterModule para que possa ser usado fora deste módulo
})
export class ObrigadoPageRoutingModule {} // Define o módulo de routing para a página Obrigado
