import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopVendasTresPageRoutingModule } from './top-vendas-tres-routing.module';

import { TopVendasTresPage } from './top-vendas-tres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopVendasTresPageRoutingModule
  ],
  declarations: [TopVendasTresPage]
})
export class TopVendasTresPageModule {}
