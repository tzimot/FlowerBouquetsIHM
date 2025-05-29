import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelarPageRoutingModule } from './cancelar-routing.module';

import { CancelarPage } from './cancelar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelarPageRoutingModule
  ],
  declarations: [CancelarPage]
})
export class CancelarPageModule {}
