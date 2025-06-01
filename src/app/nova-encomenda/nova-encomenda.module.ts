import { NgModule } from '@angular/core'; // Importa o decorator NgModule do Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns do Angular (diretivas, pipes)
import { FormsModule } from '@angular/forms'; // Importa o módulo para usar formulários

import { IonicModule } from '@ionic/angular'; // Importa componentes do Ionic para a UI

import { NovaEncomendaPageRoutingModule } from './nova-encomenda-routing.module'; // Importa o módulo de rotas específico desta página

import { NovaEncomendaPage } from './nova-encomenda.page'; // Importa o componente da página NovaEncomenda

@NgModule({
  imports: [
    CommonModule, // Importa funcionalidades comuns
    FormsModule, // Permite usar formulários
    IonicModule, // Fornece componentes e funcionalidades do Ionic
    NovaEncomendaPageRoutingModule // Importa o módulo de roteamento desta página
  ],
  declarations: [NovaEncomendaPage] // Declara o componente NovaEncomendaPage neste módulo
})
export class NovaEncomendaPageModule {} // Define o módulo da página NovaEncomenda
