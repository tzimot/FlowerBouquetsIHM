import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TopVendasUmPageRoutingModule } from './top-vendas-um-routing.module';
import { TopVendasUmPage } from './top-vendas-um.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TopVendasUmPageRoutingModule
  ],
  declarations: [TopVendasUmPage]
})
export class TopVendasUmPageModule {}
