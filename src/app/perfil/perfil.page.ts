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
    email: '',
    profilePicture: ''
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

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const imageData = e.target.result;
        await this.authService.updateProfilePicture(imageData);
        await this.loadUserData();
      };
      reader.readAsDataURL(file);
    }
  }

  async removeProfilePicture() {
    await this.authService.updateProfilePicture('');
    await this.loadUserData();
  }
}
