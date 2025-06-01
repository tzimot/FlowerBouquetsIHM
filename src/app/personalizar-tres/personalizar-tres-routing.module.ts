// Importa os módulos necessários de Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importa o componente da página que será usada nesta rota
import { PersonalizarTresPage } from './personalizar-tres.page';

// Define o array de rotas para esta página
const routes: Routes = [
  {
    path: '', // Quando o caminho for vazio, esta rota será ativada
    component: PersonalizarTresPage // O componente que será carregado é o PersonalizarTresPage
  }
];

// Declara o módulo de routing específico desta página
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa o RouterModule com as rotas definidas
  exports: [RouterModule],                  // Exporta o RouterModule para que fique disponível para outros módulos
})
export class PersonalizarTresPageRoutingModule {} // Exporta a classe do módulo de routing
