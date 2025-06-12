import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
/**
 * Página de perfil do utilizador.
 * 
 * Responsável por apresentar e permitir a edição dos dados do utilizador autenticado,
 * incluindo nome de utilizador, nome completo, email e fotografia de perfil.
 * 
 * Carrega automaticamente os dados do utilizador ao iniciar e ao entrar na página.
 * Permite ao utilizador atualizar ou remover a fotografia de perfil.
 */
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

  // Método privado para carregar os dados do utilizador autenticado
  private async loadUserData() {
    try {
      // Obtém os dados do utilizador através do serviço de autenticação
      this.userData = await this.authService.getCurrentUser();
    } catch (error) {
      // Em caso de erro, mostra no console
      console.error('Erro ao carregar os dados do utilizador:', error);
    }
  }

  /**
   * Manipula o evento de seleção de ficheiro para atualizar a foto de perfil do utilizador.
   * Lê o ficheiro selecionado, converte-o para base64 e atualiza a imagem de perfil.
   * 
   * @param event Evento de seleção de ficheiro (input type="file").
   */
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
