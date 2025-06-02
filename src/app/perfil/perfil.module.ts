import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilPage } from './perfil.page';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PerfilPage
      }
    ])
  ],
  declarations: [PerfilPage],
  providers: [AuthService]
})
export class PerfilPageModule {}
