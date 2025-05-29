import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarUmPageRoutingModule } from './finalizar-um-routing.module';

import { FinalizarUmPage } from './finalizar-um.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarUmPageRoutingModule
  ],
  declarations: [FinalizarUmPage]
})
export class FinalizarUmPageModule {}
