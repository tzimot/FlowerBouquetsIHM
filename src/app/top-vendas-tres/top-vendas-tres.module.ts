import { NgModule } from '@angular/core'; // Importa o decorador NgModule do Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns do Angular (diretivas, pipes)
import { FormsModule } from '@angular/forms'; // Importa o módulo para trabalhar com formulários template-driven

import { IonicModule } from '@ionic/angular'; // Importa o módulo Ionic para componentes UI específicos do Ionic

import { TopVendasTresPageRoutingModule } from './top-vendas-tres-routing.module'; // Importa o módulo de routing específico da página TopVendasTres

import { TopVendasTresPage } from './top-vendas-tres.page'; // Importa o componente da página TopVendasTres

@NgModule({
  imports: [ // Módulos importados que este módulo vai usar
    CommonModule, // Funcionalidades comuns do Angular
    FormsModule, // Formulários
    IonicModule, // Componentes do Ionic
    TopVendasTresPageRoutingModule // Rotas específicas desta página
  ],
  declarations: [TopVendasTresPage] // Declaração do componente pertencente a este módulo
})
export class TopVendasTresPageModule {} // Exporta o módulo da página TopVendasTres para ser usado na app
