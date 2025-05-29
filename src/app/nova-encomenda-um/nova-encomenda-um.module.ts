import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaEncomendaUmPageRoutingModule } from './nova-encomenda-um-routing.module';

import { NovaEncomendaUmPage } from './nova-encomenda-um.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NovaEncomendaUmPageRoutingModule
  ],
  declarations: [NovaEncomendaUmPage]
})
export class NovaEncomendaUmPageModule {}
