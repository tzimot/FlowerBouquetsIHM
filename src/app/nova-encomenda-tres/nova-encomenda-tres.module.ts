import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaEncomendaTresPageRoutingModule } from './nova-encomenda-tres-routing.module';

import { NovaEncomendaTresPage } from './nova-encomenda-tres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovaEncomendaTresPageRoutingModule
  ],
  declarations: [NovaEncomendaTresPage]
})
export class NovaEncomendaTresPageModule {}
