import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopVendasPageRoutingModule } from './top-vendas-routing.module';

import { TopVendasPage } from './top-vendas.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    TopVendasPageRoutingModule
  ],
  declarations: [TopVendasPage]
})
export class TopVendasPageModule {}
