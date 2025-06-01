import { NgModule } from '@angular/core'; // Importa NgModule para definir um módulo Angular
import { CommonModule } from '@angular/common'; // Importa CommonModule com funcionalidades comuns (ngIf, ngFor, etc.)
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa módulos para trabalhar com formulários (template-driven e reactive)

import { IonicModule } from '@ionic/angular'; // Importa o módulo Ionic para componentes UI e funcionalidades específicas

import { TopVendasUmPageRoutingModule } from './top-vendas-um-routing.module'; // Importa o módulo de rotas específico desta página

import { TopVendasUmPage } from './top-vendas-um.page'; // Importa o componente da página TopVendasUm

@NgModule({
  imports: [
    CommonModule, // Permite usar diretivas comuns no template
    FormsModule, // Permite usar formulários baseados em template
    IonicModule, // Permite usar componentes e funcionalidades Ionic
    ReactiveFormsModule, // Permite usar formulários reativos (mais avançados)
    TopVendasUmPageRoutingModule // Adiciona as rotas definidas para esta página
  ],
  declarations: [TopVendasUmPage] // Declara o componente TopVendasUm como parte deste módulo
})
export class TopVendasUmPageModule {} // Exporta o módulo da página TopVendasUm
