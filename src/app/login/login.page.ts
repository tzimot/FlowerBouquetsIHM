import { Component, OnInit } from '@angular/core';
import { CriarautentService } from 'src/app/services/criarautent.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private authService: CriarautentService, private router: Router, private alertController: AlertController) { 
    this.username = '';
    this.password = '';
  }

  ngOnInit() {}

  async login() {
    const isAuthenticated = await this.authService.autenticar(this.username, this.password);
    if (isAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      this.showAlert('Erro', 'Credenciais inválidas. Por favor, verifique o seu username e password.');
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
}

