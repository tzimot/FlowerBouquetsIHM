import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopVendasDoisPageRoutingModule } from './top-vendas-dois-routing.module';

import { TopVendasDoisPage } from './top-vendas-dois.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TopVendasDoisPageRoutingModule
  ],
  declarations: [TopVendasDoisPage]
})
export class TopVendasDoisPageModule {}
