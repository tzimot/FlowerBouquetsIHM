import { NgModule } from '@angular/core'; // Importa decorador para criar módulo Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns do Angular
import { FormsModule } from '@angular/forms'; // Permite usar formulários

import { IonicModule } from '@ionic/angular'; // Importa componentes e funcionalidades do Ionic

import { HomePageRoutingModule } from './home-routing.module'; // Importa o módulo de rotas para a HomePage

import { HomePage } from './home.page'; // Importa o componente HomePage

@NgModule({
  imports: [
    CommonModule, // Funcionalidades comuns para esta página
    FormsModule, // Suporte para formulários
    IonicModule, // Componentes do Ionic para esta página
    HomePageRoutingModule // Rotas específicas da HomePage
  ],
  declarations: [HomePage] // Declara o componente HomePage neste módulo
})
export class HomePageModule {} // Define o módulo da HomePage
