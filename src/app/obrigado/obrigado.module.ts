import { NgModule } from '@angular/core'; // Importa o decorador NgModule para definir um módulo Angular
import { CommonModule } from '@angular/common'; // Módulo com diretivas comuns (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms'; // Permite o uso de formulários template-driven

import { IonicModule } from '@ionic/angular'; // Importa os componentes e funcionalidades do Ionic

import { ObrigadoPageRoutingModule } from './obrigado-routing.module'; // Módulo de rotas para esta página

import { ObrigadoPage } from './obrigado.page'; // Componente da página Obrigado

@NgModule({
  imports: [
    CommonModule, // Importa funcionalidades comuns
    FormsModule, // Permite formulários
    IonicModule, // Componentes do Ionic
    ObrigadoPageRoutingModule // Liga as rotas específicas da página
  ],
  declarations: [ObrigadoPage] // Declara o componente usado neste módulo
})
export class ObrigadoPageModule {} // Define o módulo ObrigadoPage
