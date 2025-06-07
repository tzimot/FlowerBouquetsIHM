import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EncomendaService } from '../services/encomenda.service';

@Component({
  selector: 'app-cartao-pontos',
  templateUrl: './cartao-pontos.page.html',
  styleUrls: ['./cartao-pontos.page.scss'],
})
export class CartaoPontosPage implements OnInit {
  userData = {
    username: '',
    fullName: '',
    email: '',
    profilePicture: '',
    birthDate: '', 
    pontos: 0
  };

  constructor(
    private authService: AuthService,
    private encomendaService: EncomendaService
  ) {}

  async ngOnInit() {
    await this.loadUserData();
    this.encomendaService.pontos$.subscribe(pontos => {
      this.userData.pontos = pontos;
    });
  }

  async ionViewWillEnter() {
    await this.loadUserData();
    // pontos subscription is already set in ngOnInit
  }

  private async loadUserData() {
    try {
      const user = await this.authService.getCurrentUser();
      this.userData = {
        ...this.userData, // mantém os pontos já subscritos
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        birthDate: user.birthDate || ''
      };

    } catch (error) {
      console.error('Erro ao carregar dados do utilizador:', error);
    }
  }
}