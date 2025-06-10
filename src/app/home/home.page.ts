import { Router } from '@angular/router'; // Importa Router para navegação entre páginas
import { Component, OnInit  } from '@angular/core'; // Importa Component e OnInit do Angular
import { EncomendaService } from '../services/encomenda.service';

@Component({
  selector: 'app-home', // Define seletor do componente
  templateUrl: './home.page.html', // Define ficheiro HTML do componente
  styleUrls: ['./home.page.scss'], // Define ficheiro de estilos do componente
})
export class HomePage implements OnInit { // Declara componente HomePage com ciclo de vida OnInit

  constructor(
    private router: Router, 
    private encomendaService: EncomendaService // Serviço para gerir encomendas
  ) {} // Injeção de dependências para navegação e alertas

  ngOnInit() { // Método chamado na inicialização do componente
  }

  logout() { // Método para fazer logout e navegar para a página de login
    this.encomendaService.logout(); // Limpa dados do user
    this.router.navigate(['/login']); // Navega para a rota '/login'
  }
}
