// Importa o decorador NgModule para definir um módulo Angular
import { NgModule } from '@angular/core';

// Importa funcionalidades comuns como diretivas *ngIf, *ngFor, etc.
import { CommonModule } from '@angular/common';

// Importa o módulo para trabalhar com formulários template-driven
import { FormsModule } from '@angular/forms';

// Importa o módulo da framework Ionic, necessário para componentes como ion-button, ion-input, etc.
import { IonicModule } from '@ionic/angular';

// Importa o módulo de routing específico desta página (com as suas rotas)
import { PersonalizarRamoPageRoutingModule } from './personalizar-ramo-routing.module';

// Importa o componente da página propriamente dita
import { PersonalizarRamoPage } from './personalizar-ramo.page';

// Declaração do módulo PersonalizarRamoPageModule
@NgModule({
  // Módulos que este módulo importa e precisa para funcionar
  imports: [
    CommonModule,                       // Permite o uso de funcionalidades comuns do Angular
    FormsModule,                        // Permite o uso de formulários
    IonicModule,                        // Permite o uso de componentes do Ionic
    PersonalizarRamoPageRoutingModule   // Importa o routing definido para esta página
  ],
  // Declara os componentes pertencentes a este módulo
  declarations: [PersonalizarRamoPage]
})
export class PersonalizarRamoPageModule {} // Exporta o módulo para que o Angular o reconheça
