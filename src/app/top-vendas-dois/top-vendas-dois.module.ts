import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Módulo comum com diretivas como ngIf, ngFor
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Suporte para formulários template-driven e reativos

import { IonicModule } from '@ionic/angular'; // Módulo Ionic para componentes UI

import { TopVendasDoisPageRoutingModule } from './top-vendas-dois-routing.module'; // Importa as rotas específicas desta página

import { TopVendasDoisPage } from './top-vendas-dois.page'; // Componente da página

@NgModule({
  imports: [
    CommonModule, // Diretivas comuns
    FormsModule, // Formulários simples
    IonicModule, // Componentes UI do Ionic
    ReactiveFormsModule, // Formulários reativos
    TopVendasDoisPageRoutingModule // Rotas da página
  ],
  declarations: [TopVendasDoisPage] // Declara o componente desta página no módulo
})
export class TopVendasDoisPageModule {}
