// Importa o decorador NgModule do Angular
import { NgModule } from '@angular/core';
// Importa funcionalidades comuns do Angular, como ngIf e ngFor
import { CommonModule } from '@angular/common';
// Importa suporte para formulários simples (template-driven)
import { FormsModule } from '@angular/forms';

// Importa componentes e funcionalidades do Ionic
import { IonicModule } from '@ionic/angular';

// Importa o módulo de routing específico desta página
import { PersonalizarTresPageRoutingModule } from './personalizar-tres-routing.module';

// Importa o componente da página PersonalizarTres
import { PersonalizarTresPage } from './personalizar-tres.page';

// Declara o módulo Angular desta página
@NgModule({
  imports: [
    CommonModule,                // Importa funcionalidades comuns para o módulo
    FormsModule,                 // Importa suporte para formulários simples
    IonicModule,                 // Importa funcionalidades do Ionic para a UI
    PersonalizarTresPageRoutingModule  // Importa o módulo de routing desta página
  ],
  declarations: [
    PersonalizarTresPage         // Declara o componente que pertence a este módulo
  ]
})
export class PersonalizarTresPageModule {}  // Exporta o módulo para uso na app
