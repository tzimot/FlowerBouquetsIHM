import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObrigadoPageRoutingModule } from './obrigado-routing.module';

import { ObrigadoPage } from './obrigado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObrigadoPageRoutingModule
  ],
  declarations: [ObrigadoPage]
})
export class ObrigadoPageModule {}
