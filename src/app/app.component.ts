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
  /**
   * Array com as páginas da aplicação para o menu de navegação
   * Cada item contém:
   * - title: Nome exibido no menu
   * - url: Rota para navegação
   * - icon: Ícone associado (usando ícones do Ionic)
   */
  public appPages = [
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
  ) {
    // Listener para eventos de storage (usado para logout entre abas/tabs)
    window.addEventListener('storage', (event) => {
      if (event.key === 'userLoggedOut') {
        this.encomendaService.limparDados(); // Limpa dados quando logout é detectado
      }
    });
  }

  /**
   * Método para efetuar logout do utilizador
   * 1. Chama o serviço de autenticação para logout
   * 2. Limpa os dados locais das encomendas
   * 3. Redireciona para a página de login
   */
  async logout() {
    await this.authService.logout(); // Efetua logout no backend
    this.encomendaService.limparDados(); // Limpa dados locais
    this.router.navigateByUrl('/login'); // Redireciona para login
  }
}