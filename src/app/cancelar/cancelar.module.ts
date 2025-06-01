// Este código define o módulo Angular para a página "Cancelar", importando os
//  módulos necessários (como CommonModule, FormsModule, IonicModule e o módulo de rotas)
//  e declarando o component e CancelarPage para que possa ser usado nesta parte da aplicação.

import { NgModule } from '@angular/core'; // Importa o NgModule do Angular
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; // Importa suporte para formulários

import { IonicModule } from '@ionic/angular'; // Importa componentes e funcionalidades do Ionic

import { CancelarPageRoutingModule } from './cancelar-routing.module'; // Importa o módulo de rotas da página Cancelar

import { CancelarPage } from './cancelar.page'; // Importa o componente da página Cancelar

@NgModule({
  imports: [
    CommonModule, // Módulo com diretivas comuns do Angular
    FormsModule, // Módulo para trabalhar com formulários
    IonicModule, // Módulo com componentes visuais do Ionic
    CancelarPageRoutingModule // Módulo com as rotas da página Cancelar
  ],
  declarations: [CancelarPage] // Declara o componente CancelarPage para uso neste módulo
})
export class CancelarPageModule {} // Define e exporta o módulo da página Cancelar
