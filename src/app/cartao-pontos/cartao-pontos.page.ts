import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
    pontos: 0
  };

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.loadUserData();
  }

  async ionViewWillEnter() {
    await this.loadUserData();
  }

  private async loadUserData() {
    try {
      const user = await this.authService.getCurrentUser();
      this.userData = {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        pontos: user.points // Map 'points' to 'pontos'
      };
    } catch (error) {
      console.error('Erro ao carregar dados do utilizador:', error);
    }
  }
}
