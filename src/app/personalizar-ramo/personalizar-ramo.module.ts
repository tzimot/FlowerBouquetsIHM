import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalizarRamoPageRoutingModule } from './personalizar-ramo-routing.module';

import { PersonalizarRamoPage } from './personalizar-ramo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalizarRamoPageRoutingModule
  ],
  declarations: [PersonalizarRamoPage]
})
export class PersonalizarRamoPageModule {}
