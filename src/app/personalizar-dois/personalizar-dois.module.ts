import { NgModule } from '@angular/core'; // Importa o decorator NgModule do Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns como ngIf, ngFor
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa módulos para formulários template-driven e reativos

import { IonicModule } from '@ionic/angular'; // Importa componentes do Ionic (UI e funcionalidades nativas)

import { PersonalizarDoisPageRoutingModule } from './personalizar-dois-routing.module'; // Importa o módulo de rotas desta página

import { PersonalizarDoisPage } from './personalizar-dois.page'; // Importa o componente da página

@NgModule({
  imports: [
    CommonModule, // Funcionalidades Angular comuns
    FormsModule, // Suporte para formulários template-driven
    IonicModule, // Componentes e funcionalidades do Ionic
    ReactiveFormsModule, // Suporte para formulários reativos
    PersonalizarDoisPageRoutingModule // Rotas da página
  ],
  declarations: [PersonalizarDoisPage] // Declara o componente usado neste módulo
})
export class PersonalizarDoisPageModule {} // Define o módulo da página PersonalizarDois
