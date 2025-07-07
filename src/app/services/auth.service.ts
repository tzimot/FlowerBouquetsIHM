import { Injectable } from '@angular/core'; // Importa o decorador Injectable do Angular
import { Storage } from '@ionic/storage-angular'; // Importa o serviço de storage do Ionic
import { CriarautentService } from './criarautent.service'; // Importa o serviço de autenticação personalizado

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Objeto que representa o utilizador atual
  private currentUser = {
    username: '',
    fullName: '',
    email: '',
    profilePicture: '',
    birthDate: '',
    points: 0
  };
  private initialized = false; // Flag para garantir inicialização única

  constructor(
    private storage: Storage, // Injeta o serviço de storage
    private criarautentService: CriarautentService // Injeta o serviço de autenticação
  ) {}

  // Inicializa o serviço e carrega o utilizador do storage, se existir
  private async initializeService() {
    if (this.initialized) return; // Evita inicializações repetidas

    await this.storage.create(); // Garante que o storage está pronto
    const user = await this.storage.get('currentUser'); // Vai buscar o utilizador guardado
    if (user) {
      // Atualiza os dados do utilizador a partir do serviço externo
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
    }
    this.initialized = true; // Marca como inicializado
  }

  // Obtém o utilizador atual, atualizando os dados se necessário
  async getCurrentUser() {
    await this.storage.create();
    const user = await this.storage.get('currentUser');
    if (!user) return this.currentUser; // Se não houver utilizador guardado, devolve o default

    // Atualiza os dados do utilizador a partir do serviço externo
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

  // Define e guarda o utilizador atual, atualizando também no serviço externo
  async setCurrentUser(userData: any) {
    await this.initializeService();
    this.currentUser = {
      username: userData.username,
      fullName: userData.fullName,
      email: userData.email,
      profilePicture: userData.profilePicture || '',
      birthDate: userData.birthDate || '',
      points: userData.points || 0
    };

    await this.storage.set('currentUser', this.currentUser); // Guarda localmente
    await this.criarautentService.updateUserProfile(userData.username, {
      fullName: userData.fullName,
      email: userData.email,
      profilePicture: userData.profilePicture,
      birthDate: userData.birthDate, 
      points: userData.points || 0
    }); // Atualiza no serviço externo
  }

  // Atualiza apenas a foto de perfil do utilizador
  async updateProfilePicture(imageData: string) {
    this.currentUser.profilePicture = imageData;
    await this.storage.set('currentUser', this.currentUser); // Atualiza localmente
    await this.criarautentService.updateUserProfile(this.currentUser.username, {
      profilePicture: imageData
    }); // Atualiza no serviço externo
  }

  // Atualiza apenas os pontos do utilizador
  async updatePoints(newPoints: number) {
    this.currentUser.points = newPoints;
    await this.storage.set('currentUser', this.currentUser);
    await this.criarautentService.updateUserProfile(this.currentUser.username, {
      points: newPoints
    });
  }

  // Faz logout, removendo o utilizador do storage e limpando o estado local
  async logout() {
    await this.storage.remove('currentUser');
    this.currentUser = {
      username: '',
      fullName: '',
      email: '',
      profilePicture: '',
      birthDate: '',
      points: 0
    };
    this.initialized = false;
  }
}
