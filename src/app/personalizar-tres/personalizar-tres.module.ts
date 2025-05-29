import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalizarTresPageRoutingModule } from './personalizar-tres-routing.module';

import { PersonalizarTresPage } from './personalizar-tres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    PersonalizarTresPageRoutingModule
  ],
  declarations: [PersonalizarTresPage]
})
export class PersonalizarTresPageModule {}
