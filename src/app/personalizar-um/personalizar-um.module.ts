import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { PersonalizarUmPageRoutingModule } from './personalizar-um-routing.module';

import { PersonalizarUmPage } from './personalizar-um.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PersonalizarUmPageRoutingModule
  ],
  declarations: [PersonalizarUmPage]
})
export class PersonalizarUmPageModule {}
