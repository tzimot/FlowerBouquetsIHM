import { NgModule } from '@angular/core'; // Importa o NgModule
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns do Angular
import { FormsModule } from '@angular/forms'; // Importa suporte para formulários 

import { IonicModule } from '@ionic/angular'; // Importa componentes e funcionalidades do Ionic

import { CriarContaPageRoutingModule } from './criar-conta-routing.module'; // Importa o módulo de rotas da página CriarConta

import { CriarContaPage } from './criar-conta.page'; // Importa o componente da página CriarConta

@NgModule({
  imports: [
    CommonModule, // Importa básicos do Angular
    FormsModule, // Permite usar formulários no componente
    IonicModule, // Permite usar componentes do Ionic na página
    CriarContaPageRoutingModule // Adiciona as rotas específicas para esta página
  ],
  declarations: [CriarContaPage] // Declara o componente CriarContaPage para este módulo
})
export class CriarContaPageModule {} // Define e exporta o módulo da página CriarConta
