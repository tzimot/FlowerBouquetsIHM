import { NgModule } from '@angular/core'; // Importa NgModule para definir um módulo Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns como ngIf e ngFor
import { FormsModule } from '@angular/forms'; // Importa para usar formulários template-driven

import { IonicModule } from '@ionic/angular'; // Importa componentes Ionic

import { TopVendasPageRoutingModule } from './top-vendas-routing.module'; // Importa o módulo de rotas da página TopVendas

import { TopVendasPage } from './top-vendas.page'; // Importa o componente da página TopVendas
import { HttpClientModule } from '@angular/common/http'; // Importa módulo para fazer pedidos HTTP

@NgModule({
  imports: [
    CommonModule, // Para diretivas comuns
    FormsModule, // Para trabalhar com formulários
    IonicModule, // Componentes Ionic
    HttpClientModule, // Para comunicação HTTP
    TopVendasPageRoutingModule // Rotas específicas da página TopVendas
  ],
  declarations: [TopVendasPage] // Declara o componente da página TopVendas neste módulo
})
export class TopVendasPageModule {} // Exporta o módulo para ser usado na app
