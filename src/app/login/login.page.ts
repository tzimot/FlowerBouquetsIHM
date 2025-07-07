import { Component, OnInit } from '@angular/core';
import { CriarautentService } from 'src/app/services/criarautent.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EncomendaService } from '../services/encomenda.service';

// Declaração do componente LoginPage
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Variáveis para armazenar username e password do formulário
  username: string = '';
  password: string = '';

  // Injeta os serviços necessários no construtor
  constructor(
    private criarautentService: CriarautentService, // Serviço de autenticação customizado
    private authService: AuthService,               // Serviço de autenticação global
    private encomendaService: EncomendaService,     // Serviço de encomendas
    private router: Router,                         // Serviço de navegação
    private alertController: AlertController        // Serviço para mostrar alertas
  ) {}

  // Método chamado ao inicializar o componente
  ngOnInit() {}

  // Função chamada ao tentar fazer login
  async login() {
    // Tenta autenticar o utilizador com o serviço customizado
    const isAuthenticated = await this.criarautentService.autenticar(this.username, this.password);

    if (isAuthenticated) {
      // Se autenticado, obtém todos os utilizadores
      const users = await this.criarautentService.getUsers();
      // Procura o utilizador autenticado na lista
      const matchedUser = users.find((user: any) => user.username === this.username);

      if (!matchedUser) {
        // Caso raro: utilizador não encontrado após autenticação
        this.showAlert('Erro', 'Utilizador não encontrado.');
        return;
      }

      // Guarda o utilizador autenticado no AuthService
      await this.authService.setCurrentUser({
        username: matchedUser.username,
        fullName: matchedUser['fullName'] || matchedUser.username,
        email: matchedUser['email'] || ''
      });

      // Define o utilizador atual no serviço de encomendas
      this.encomendaService.setUserId(matchedUser.username);

      // Redireciona para a página inicial
      this.router.navigate(['/home']);
    } else {
      // Se falhar a autenticação, mostra alerta de erro
      this.showAlert('Erro', 'Credenciais inválidas. Por favor, verifique o seu username e password.');
    }
  }

  // Função auxiliar para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
