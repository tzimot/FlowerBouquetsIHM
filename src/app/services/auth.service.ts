import { Injectable } from '@angular/core'; // Importa o decorador Injectable do Angular
import { Storage } from '@ionic/storage-angular'; // Importa o serviço de storage do Ionic
import { CriarautentService } from './criarautent.service'; // Importa o serviço de autenticação personalizado

/**
 * Serviço responsável pela gestão da autenticação e dados do utilizador
 * Permite:
 * - Armazenar e recuperar dados do utilizador
 * - Atualizar informações do perfil
 * - Gerir pontos do utilizador
 * - Efetuar logout
 */
@Injectable({
  providedIn: 'root' // Disponibilizado como serviço singleton em toda a aplicação
})
export class AuthService {
  private currentUser = {
    username: '',        // Nome de utilizador único
    fullName: '',        // Nome completo
    email: '',           // Email do utilizador
    profilePicture: '',   // URL ou base64 da imagem de perfil
    birthDate: '',       // Data de nascimento
    points: 0            // Pontos acumulados
  };
  private initialized = false;

  /**
   * Construtor do serviço
   * @param storage Serviço de armazenamento local
   * @param criarautentService Serviço externo de autenticação
   */
  constructor(
    private storage: Storage, // Injeta o serviço de storage
    private criarautentService: CriarautentService // Injeta o serviço de autenticação
  ) {}

  private async initializeService() {
    if (this.initialized) return;

    await this.storage.create();
    const user = await this.storage.get('currentUser');
    if (user) {
      const updatedUser = await this.criarautentService.getUser(user.username);
      if (updatedUser) {
        this.currentUser = {
          username: updatedUser.username,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          profilePicture: updatedUser.profilePicture || '', // Fallback para string vazia
          birthDate: updatedUser.birthDate || '',
          points: updatedUser.points || 0 // Fallback para 0 pontos
        };
      }
    }
    this.initialized = true; // Marca como inicializado
  }

  async getCurrentUser() {
    await this.storage.create(); // Garante que o storage está criado
    const user = await this.storage.get('currentUser');
    if (!user) return this.currentUser;

    const updatedUser = await this.criarautentService.getUser(user.username);
    if (updatedUser) {
      this.currentUser = {
        username: updatedUser.username,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture || '',
        birthDate: updatedUser.birthDate || '',
        points: updatedUser.points || 0
      };
    }
    return this.currentUser;
  }

  async setCurrentUser(userData: any) {
    await this.initializeService();
    
    // Atualiza dados locais
    this.currentUser = {
      username: userData.username,
      fullName: userData.fullName,
      email: userData.email,
      profilePicture: userData.profilePicture || '',
      birthDate: userData.birthDate || '',
      points: userData.points || 0
    };

    await this.storage.set('currentUser', this.currentUser);
    await this.criarautentService.updateUserProfile(userData.username, {
      fullName: userData.fullName,
      email: userData.email,
      profilePicture: userData.profilePicture,
      birthDate: userData.birthDate, 
      points: userData.points || 0
    });

  }

  async updateProfilePicture(imageData: string) {
    this.currentUser.profilePicture = imageData;
    await this.storage.set('currentUser', this.currentUser);
    await this.criarautentService.updateUserProfile(this.currentUser.username, {
      profilePicture: imageData
    }); // Atualiza no serviço externo
  }

  async updatePoints(newPoints: number) {
    this.currentUser.points = newPoints;
    
    // Atualiza localmente
    await this.storage.set('currentUser', this.currentUser);
    
    // Atualiza no servidor
    await this.criarautentService.updateUserProfile(this.currentUser.username, {
      points: newPoints
    });
  }

  async logout() {
    // Remove utilizador do armazenamento local
    await this.storage.remove('currentUser');
    
    // Reseta dados locais
    this.currentUser = {
      username: '',
      fullName: '',
      email: '',
      profilePicture: '',
      birthDate: '',
      points: 0
    };
    
    this.initialized = false;
    
    // Notifica outras abas/tabs do navegador sobre o logout
    localStorage.setItem('userLoggedOut', Date.now().toString());
  }
}