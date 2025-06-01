import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular'; // Importa componentes e funcionalidades do Ionic

import { FinalizarUmPageRoutingModule } from './finalizar-um-routing.module'; // Importa o módulo de rotas para esta página

import { FinalizarUmPage } from './finalizar-um.page'; // Importa o componente da página FinalizarUm

@NgModule({
  imports: [
    CommonModule, // Funcionalidades comuns para esta página
    FormsModule, // Suporte para formulários
    IonicModule, // Componentes do Ionic para esta página
    FinalizarUmPageRoutingModule // Rotas específicas da página
  ],
  declarations: [FinalizarUmPage] // Declara o componente para este módulo
})
export class FinalizarUmPageModule {} // Define o módulo da página FinalizarUm
