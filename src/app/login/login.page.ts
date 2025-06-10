import { Component, OnInit } from '@angular/core';
import { CriarautentService } from 'src/app/services/criarautent.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EncomendaService } from '../services/encomenda.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private criarautentService: CriarautentService,
    private authService: AuthService,
    private encomendaService: EncomendaService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async login() {
    const isAuthenticated = await this.criarautentService.autenticar(this.username, this.password);

    if (isAuthenticated) {
      const users = await this.criarautentService.getUsers();
      const matchedUser = users.find((user: any) => user.username === this.username);

      if (!matchedUser) {
        // Safety check — unlikely if authenticated, but just in case
        this.showAlert('Erro', 'Utilizador não encontrado.');
        return;
      }

      await this.authService.setCurrentUser({
        username: matchedUser.username,
        fullName: matchedUser['fullName'] || matchedUser.username,
        email: matchedUser['email'] || ''
      });

      this.encomendaService.setUserId(matchedUser.username);

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
