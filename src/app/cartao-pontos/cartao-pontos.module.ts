import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaoPontosPageRoutingModule } from './cartao-pontos-routing.module';

import { CartaoPontosPage } from './cartao-pontos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaoPontosPageRoutingModule
  ],
  declarations: [CartaoPontosPage]
})
export class CartaoPontosPageModule {}
