import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaEncomendaPageRoutingModule } from './nova-encomenda-routing.module';

import { NovaEncomendaPage } from './nova-encomenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovaEncomendaPageRoutingModule
  ],
  declarations: [NovaEncomendaPage]
})
export class NovaEncomendaPageModule {}
