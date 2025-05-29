import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaEncomendaDoisPageRoutingModule } from './nova-encomenda-dois-routing.module';

import { NovaEncomendaDoisPage } from './nova-encomenda-dois.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NovaEncomendaDoisPageRoutingModule
  ],
  declarations: [NovaEncomendaDoisPage]
})
export class NovaEncomendaDoisPageModule {}
