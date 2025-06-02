import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData = {
    username: '',
    fullName: '',
    email: ''
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
      this.userData = await this.authService.getCurrentUser();
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }
}
