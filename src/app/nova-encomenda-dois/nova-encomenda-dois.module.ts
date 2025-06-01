import { NgModule } from '@angular/core'; // Importa o decorador NgModule para definir módulos Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa módulos para formulários reativos

import { IonicModule } from '@ionic/angular'; // Importa componentes do Ionic para UI

import { NovaEncomendaDoisPageRoutingModule } from './nova-encomenda-dois-routing.module'; // Importa o módulo de rotas desta página

import { NovaEncomendaDoisPage } from './nova-encomenda-dois.page'; // Importa o componente principal da página

@NgModule({
  imports: [ // Regista módulos que este módulo vai usar
    CommonModule, // Funcionalidades básicas Angular
    FormsModule, // Formulários template-driven
    IonicModule, // Componentes do Ionic
    ReactiveFormsModule, // Formulários reativos
    NovaEncomendaDoisPageRoutingModule // Rotas específicas da página
  ],
  declarations: [NovaEncomendaDoisPage] // Declara o componente associado a este módulo
})
export class NovaEncomendaDoisPageModule {} // Define o módulo da página NovaEncomendaDois
