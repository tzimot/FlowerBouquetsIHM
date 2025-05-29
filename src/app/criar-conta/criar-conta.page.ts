import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController, AlertController  } from '@ionic/angular';
import { CriarautentService } from 'src/app/services/criarautent.service';




@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {

  username: string;
  password: string;

  constructor(private storage: Storage, private navCtrl: NavController, private criarAutentService: CriarautentService, private alertController: AlertController) {

    this.username = '';
    this.password = '';

   }

   async criarconta() {
    if (this.username.length < 4 || this.password.length < 4) {
      this.showAlert('Erro', 'O username e a password devem ter pelo menos 4 caracteres.');
    } else {
      const existingUser = await this.criarAutentService.checkExistingUser(this.username);
      if (existingUser) {
        this.showAlert('Username existente!', 'Por favor, escolha outro username.');
      } else {
        await this.criarAutentService.criarConta(this.username, this.password);
        this.navCtrl.navigateRoot('/login');
      }
    }
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    
  }

}
