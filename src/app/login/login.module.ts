import { NgModule } from '@angular/core'; // Importa decorador para criar módulo Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns do Angular
import { FormsModule } from '@angular/forms'; // Permite usar formulários no módulo

import { IonicModule } from '@ionic/angular'; // Importa componentes e funcionalidades do Ionic

import { LoginPageRoutingModule } from './login-routing.module'; // Importa o módulo de rotas específico da página Login

import { LoginPage } from './login.page'; // Importa o componente LoginPage

@NgModule({
  imports: [
    CommonModule, // Funcionalidades comuns para esta página
    FormsModule, // Suporte para formulários
    IonicModule, // Componentes do Ionic para esta página
    LoginPageRoutingModule // Rotas específicas da LoginPage
  ],
  declarations: [LoginPage] // Declara o componente LoginPage neste módulo
})
export class LoginPageModule {} // Define o módulo da página Login
