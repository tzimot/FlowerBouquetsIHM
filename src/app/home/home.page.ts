import { CriarautentService } from 'src/app/services/criarautent.service'; // Importa serviço de autenticação (não usado neste código)
import { Router } from '@angular/router'; // Importa Router para navegação entre páginas
import { AlertController } from '@ionic/angular'; // Importa controlador de alertas do Ionic
import { Component, OnInit  } from '@angular/core'; // Importa Component e OnInit do Angular

@Component({
  selector: 'app-home', // Define seletor do componente
  templateUrl: './home.page.html', // Define ficheiro HTML do componente
  styleUrls: ['./home.page.scss'], // Define ficheiro de estilos do componente
})
export class HomePage implements OnInit { // Declara componente HomePage com ciclo de vida OnInit

  constructor(private router: Router, private alertController: AlertController) {} // Injeção de dependências para navegação e alertas

  ngOnInit() { // Método chamado na inicialização do componente
  }

  logout() { // Método para fazer logout e navegar para a página de login
    this.router.navigate(['/login']); // Navega para a rota '/login'
  }
}
