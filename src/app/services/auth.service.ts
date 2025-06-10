import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CriarautentService } from './criarautent.service';

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
  // Objeto com os dados atuais do utilizador
  private currentUser = {
    username: '',        // Nome de utilizador único
    fullName: '',        // Nome completo
    email: '',           // Email do utilizador
    profilePicture: '',   // URL ou base64 da imagem de perfil
    birthDate: '',       // Data de nascimento
    points: 0            // Pontos acumulados
  };

  // Flag para controlar se o serviço foi inicializado
  private initialized = false;

  /**
   * Construtor do serviço
   * @param storage Serviço de armazenamento local
   * @param criarautentService Serviço externo de autenticação
   */
  constructor(
    private storage: Storage,
    private criarautentService: CriarautentService
  ) {}

  /**
   * Método de inicialização do serviço
   * Carrega os dados do utilizador do armazenamento local
   * e sincroniza com o servidor
   */
  private async initializeService() {
    if (this.initialized) return; // Evita inicialização múltipla

    await this.storage.create(); // Garante que o storage está criado
    
    // Obtém utilizador do armazenamento local
    const user = await this.storage.get('currentUser');
    if (user) {
      // Atualiza dados a partir do servidor
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

  /**
   * Obtém os dados atuais do utilizador
   * @returns Objeto com dados do utilizador
   */
  async getCurrentUser() {
    await this.storage.create(); // Garante que o storage está criado
    const user = await this.storage.get('currentUser');
    
    // Se não existir utilizador local, retorna objeto vazio
    if (!user) return this.currentUser;

    // Sincroniza com dados do servidor
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

  /**
   * Define/Atualiza os dados do utilizador atual
   * @param userData Objeto com dados do utilizador
   */
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

    // Guarda localmente
    await this.storage.set('currentUser', this.currentUser);
    
    // Atualiza no servidor
    await this.criarautentService.updateUserProfile(userData.username, {
      fullName: userData.fullName,
      email: userData.email,
      profilePicture: userData.profilePicture,
      birthDate: userData.birthDate, 
      points: userData.points || 0
    });
  }

  /**
   * Atualiza a imagem de perfil do utilizador
   * @param imageData Dados da imagem (URL ou base64)
   */
  async updateProfilePicture(imageData: string) {
    this.currentUser.profilePicture = imageData;
    
    // Atualiza localmente
    await this.storage.set('currentUser', this.currentUser);
    
    // Atualiza no servidor
    await this.criarautentService.updateUserProfile(this.currentUser.username, {
      profilePicture: imageData
    });
  }

  /**
   * Atualiza os pontos do utilizador
   * @param newPoints Novo valor de pontos
   */
  async updatePoints(newPoints: number) {
    this.currentUser.points = newPoints;
    
    // Atualiza localmente
    await this.storage.set('currentUser', this.currentUser);
    
    // Atualiza no servidor
    await this.criarautentService.updateUserProfile(this.currentUser.username, {
      points: newPoints
    });
  }

  /**
   * Efetua logout do utilizador
   * Limpa todos os dados locais e notifica outras abas
   */
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