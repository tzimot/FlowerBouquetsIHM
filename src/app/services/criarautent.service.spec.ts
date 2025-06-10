import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

/**
 * Serviço responsável pela gestão de autenticação e utilizadores
 * Utiliza o Ionic Storage para persistência local dos dados
 */
@Injectable({
  providedIn: 'root' // Disponibilizado como singleton em toda a aplicação
})
export class CriarautentService {
  // Flag para controlar se o storage foi inicializado
  private storageInitialized: boolean = false;

  constructor(private storage: Storage) {
    // Inicializa o storage quando o serviço é criado
    this.initStorage();
  }

  /**
   * Inicializa o sistema de armazenamento
   */
  private async initStorage() {
    await this.storage.create();
    this.storageInitialized = true;
  }

  /**
   * Cria uma nova conta de utilizador
   * Dados do utilizador a criar
   */
  async criarConta(userData: any) {
    // Garante que o storage está inicializado
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    // Obtém lista existente de utilizadores ou cria nova
    const existingUsers = await this.storage.get('users') || [];
    
    // Adiciona novo utilizador
    existingUsers.push(userData);
    
    // Atualiza a lista no storage
    await this.storage.set('users', existingUsers);
  }

  /**
   * Autentica um utilizador
   * Nome de utilizador
   * Palavra-passe
   * Promise<boolean> True se autenticação for bem sucedida
   */
  async autenticar(username: string, password: string) {
    // Garante que o storage está inicializado
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    // Obtém lista de utilizadores
    const existingUsers = await this.storage.get('users') || [];
    
    // Procura utilizador com credenciais correspondentes
    const matchedUser = existingUsers.find((user: { username: string; password: string }) =>
      user.username === username && user.password === password
    );

    return !!matchedUser; // Retorna true se encontrou, false caso contrário
  }

  /**
   * Verifica se um nome de utilizador já existe
   * Nome de utilizador a verificar
   * <boolean> True se o utilizador existir
   */
  async checkExistingUser(username: string) {
    // Garante que o storage está inicializado
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    // Obtém lista de utilizadores
    const existingUsers = await this.storage.get('users') || [];
    
    // Procura utilizador com o username especificado
    const matchedUser = existingUsers.find((user: { username: string }) =>
      user.username === username
    );

    return !!matchedUser; // Retorna true se encontrou, false caso contrário
  }

  /**
   * Obtém a lista completa de utilizadores
   *Promise<Array> Lista de utilizadores
   */
  async getUsers() {
    // Garante que o storage está inicializado
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    
    // Retorna lista de utilizadores ou array vazio se não existir
    return await this.storage.get('users') || [];
  }

  /**
   * Obtém um utilizador específico pelo username
   * @param username Nome de utilizador a procurar
   * @returns Promise<any> Dados do utilizador ou undefined se não encontrado
   */
  async getUser(username: string) {
    // Garante que o storage está inicializado
    if (!this.storageInitialized) {
      await this.initStorage();
    }
  
    // Obtém lista de utilizadores
    const users = await this.storage.get('users') || [];
    
    // Retorna o utilizador encontrado ou undefined
    return users.find((user: any) => user.username === username);
  }
  
  /**
   * Atualiza o perfil de um utilizador
   * @param username Nome de utilizador a atualizar
   * @param updates Objeto com campos a atualizar
   */
  async updateUserProfile(username: string, updates: Partial<any>) {
    // Garante que o storage está inicializado
    if (!this.storageInitialized) {
      await this.initStorage();
    }
  
    // Obtém lista de utilizadores
    const users = await this.storage.get('users') || [];
  
    // Mapeia a lista para atualizar o utilizador específico
    const updatedUsers = users.map((user: any) => {
      if (user.username === username) {
        return { ...user, ...updates }; // Combina propriedades existentes com atualizações
      }
      return user;
    });
  
    // Guarda a lista atualizada
    await this.storage.set('users', updatedUsers);
  }
}