import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalizarDoisPageRoutingModule } from './personalizar-dois-routing.module';

import { PersonalizarDoisPage } from './personalizar-dois.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PersonalizarDoisPageRoutingModule
  ],
  declarations: [PersonalizarDoisPage]
})
export class PersonalizarDoisPageModule {}
