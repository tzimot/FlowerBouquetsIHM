import { Component, OnInit } from '@angular/core'; // Importa Component e OnInit do Angular
import { CriarautentService } from 'src/app/services/criarautent.service'; // Serviço de autenticação
import { Router } from '@angular/router'; // Serviço para navegação entre páginas
import { AlertController } from '@ionic/angular'; // Controlador para alertas no Ionic

@Component({
  selector: 'app-login', // Seletor do componente
  templateUrl: './login.page.html', // Template HTML da página
  styleUrls: ['./login.page.scss'], // Estilos da página
})
export class LoginPage implements OnInit {

  username: string; // Variável para o nome de utilizador
  password: string; // Variável para a password

  constructor(private authService: CriarautentService, private router: Router, private alertController: AlertController) { 
    this.username = ''; // Inicializa username vazio
    this.password = ''; // Inicializa password vazia
  }

  async login() { // Função assíncrona para login
    const isAuthenticated = await this.authService.autenticar(this.username, this.password); // Verifica credenciais
    if (isAuthenticated) {
      this.router.navigate(['/home']); // Se OK, redireciona para a página principal
    } else {
      this.showAlert('Erro', 'Credenciais inválidas. Por favor, verifique o seu username e password.'); // Se falhar, mostra alerta
    }
  }

  async showAlert(header: string, message: string) { // Função para mostrar alertas
    const alert = await this.alertController.create({
      header, // Cabeçalho do alerta
      message, // Mensagem do alerta
      buttons: ['OK'] // Botão OK para fechar alerta
    });
    await alert.present(); // Apresenta o alerta ao utilizador
  }


  ngOnInit() { } // Método chamado na inicialização do componente, vazio neste caso

