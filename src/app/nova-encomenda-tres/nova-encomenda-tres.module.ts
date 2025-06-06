import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { NovaEncomendaTresPage } from './nova-encomenda-tres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: NovaEncomendaTresPage }])
  ],
  declarations: [NovaEncomendaTresPage]
})
export class NovaEncomendaTresPageModule {}
