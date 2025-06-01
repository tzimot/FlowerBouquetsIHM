import { NgModule } from '@angular/core';
// Importa o decorator NgModule para definir um módulo Angular

import { CommonModule } from '@angular/common';
// Importa funcionalidades comuns do Angular, como diretivas ngIf e ngFor

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Importa os módulos para formulários template-driven (FormsModule) e reactive forms (ReactiveFormsModule)

import { IonicModule } from '@ionic/angular';
// Importa o módulo Ionic para componentes e funcionalidades específicas do Ionic Framework

import { PersonalizarUmPageRoutingModule } from './personalizar-um-routing.module';
// Importa o módulo de routing específico para a página PersonalizarUm

import { PersonalizarUmPage } from './personalizar-um.page';
// Importa o componente da página PersonalizarUm

@NgModule({
  imports: [
    CommonModule,               // Módulo com diretivas comuns do Angular
    FormsModule,                // Suporte para formulários template-driven
    IonicModule,                // Componentes e serviços do Ionic
    ReactiveFormsModule,        // Suporte para formulários reativos (mais avançado)
    PersonalizarUmPageRoutingModule  // Configuração das rotas para esta página
  ],
  declarations: [PersonalizarUmPage] // Declara o componente PersonalizarUmPage neste módulo
})
export class PersonalizarUmPageModule {}
// Define e exporta o módulo da página PersonalizarUm
