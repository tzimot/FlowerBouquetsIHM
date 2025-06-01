// Importa os módulos necessários do Angular para criar e configurar rotas
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importa o componente que será associado à rota
import { PersonalizarRamoPage } from './personalizar-ramo.page';

// Define as rotas para este módulo específico
const routes: Routes = [
  {
    path: '',                           // Caminho vazio significa que esta rota é usada quando se acede diretamente a este módulo
    component: PersonalizarRamoPage     // O componente a ser carregado quando se acede a este caminho
  }
];

// Declara e configura o módulo de routing para esta página
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa o RouterModule com as rotas definidas (forChild = rotas específicas de um módulo)
  exports: [RouterModule],                  // Exporta o RouterModule para que possa ser usado noutros ficheiros
})
export class PersonalizarRamoPageRoutingModule {} // Exporta o módulo de routing com o nome apropriado
