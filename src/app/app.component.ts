import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { EncomendaService } from './services/encomenda.service';

/**
 * Componente raiz da aplicação Angular
 * Responsável pela estrutura principal e navegação
 */
@Component({
  selector: 'app-root', // Seletor para usar no HTML
  templateUrl: 'app.component.html', // Template associado
  styleUrls: ['app.component.scss'], // Estilos associados
})
export class AppComponent {
  public appPages = [  // Definição das páginas do menu lateral da aplicação
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Os Nossos Ramos', url: '/nova-encomenda', icon: 'pricetags' },
    { title: 'Personalizar Ramo', url: '/personalizar-ramo', icon: 'gift' },
    { title: 'Em Alta', url: '/top-vendas', icon: 'heart' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Cartão de Pontos', url: '/cartao-pontos', icon: 'card' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private encomendaService: EncomendaService
  ) {}

  async logout() { // Método para fazer logout do utilizador
    // Limpa os dados do utilizador no serviço de encomendas
    this.encomendaService.logout();
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}