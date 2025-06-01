import { NgModule } from '@angular/core'; // Importa decorador para criar módulo Angular
import { Routes, RouterModule } from '@angular/router'; // Importa ferramentas para definir rotas

import { LoginPage } from './login.page'; // Importa o componente LoginPage

const routes: Routes = [ // Define as rotas deste módulo
  {
    path: '', // Rota base (vazia)
    component: LoginPage // Componente a carregar nesta rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Regista as rotas como filhas do módulo principal
  exports: [RouterModule], // Exporta o módulo de rotas para uso externo
})
export class LoginPageRoutingModule {} // Declara o módulo de routing para a LoginPage
