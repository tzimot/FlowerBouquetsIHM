import { NgModule } from '@angular/core'; // Importa NgModule para criar um módulo Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns do Angular
import { FormsModule } from '@angular/forms'; // Importa módulo para formulários template-driven

import { IonicModule } from '@ionic/angular'; // Importa módulo Ionic para componentes UI

import { NovaEncomendaTresPageRoutingModule } from './nova-encomenda-tres-routing.module'; // Importa o routing da página

import { NovaEncomendaTresPage } from './nova-encomenda-tres.page'; // Importa o componente da página

@NgModule({
  imports: [
    CommonModule, // Importa funcionalidades comuns
    FormsModule, // Importa suporte para formulários
    IonicModule, // Importa componentes Ionic
    NovaEncomendaTresPageRoutingModule // Importa rotas específicas desta página
  ],
  declarations: [NovaEncomendaTresPage] // Declara o componente desta página
})
export class NovaEncomendaTresPageModule {} // Exporta o módulo da página
