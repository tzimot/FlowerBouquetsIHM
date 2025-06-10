import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { AuthService } from './services/auth.service';
import { EncomendaService } from './services/encomenda.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
  ) {
    // Adicionar listener para eventos de logout
    window.addEventListener('storage', (event) => {
      if (event.key === 'userLoggedOut') {
        this.encomendaService.limparDados();
      }
    });
  }

  async logout() {
    this.encomendaService.logout();
    await this.authService.logout();
    this.encomendaService.limparDados(); // Limpar dados diretamente ao fazer logout
    this.router.navigateByUrl('/login');
  }
}
