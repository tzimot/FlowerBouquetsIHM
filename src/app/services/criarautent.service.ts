import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// Interface para definir a estrutura de um utilizador
interface User {
  username: string;
  password: string;
  profilePicture?: string;
  [key: string]: any; // Permite propriedades adicionais
}

/**
 * Serviço para criar e autenticar utilizadores, bem como gerir perfis.
 */
@Injectable({
  providedIn: 'root' // Torna este serviço disponível globalmente
})
export class CriarautentService {
  private storageInitialized: boolean = false; // Indica se o armazenamento já foi inicializado

  constructor(private storage: Storage) {
    this.initStorage(); // Inicializa o armazenamento ao criar o serviço
  }

  /**
   * Inicializa o armazenamento local.
   */
  // Inicializa o armazenamento local (apenas uma vez)
  private async initStorage() {
    await this.storage['create']();
    this.storageInitialized = true;
  }

  /**
   * Cria uma nova conta de utilizador e guarda-a no armazenamento.
   * @param userData Dados do novo utilizador.
   */
  // Cria uma nova conta de utilizador
  async criarConta(userData: User) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    // Vai buscar os utilizadores já existentes ou inicializa um array vazio
    const existingUsers = await this.storage['get']('users') || [];

    // Adiciona o novo utilizador
    existingUsers.push(userData);

    // Guarda a nova lista de utilizadores
    await this.storage['set']('users', existingUsers);

    // Define o utilizador atual como o recém-criado
    await this.storage.set('user', userData); 
  }

  /**
   * Autentica um utilizador verificando o nome de utilizador e a palavra-passe.
   * @param username Nome de utilizador.
   * @param password Palavra-passe.
   * @returns O utilizador autenticado ou false se não existir.
   */
  // Autentica um utilizador com username e password
  async autenticar(username: string, password: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    const existingUsers = await this.storage['get']('users') || [];

    // Procura um utilizador com as credenciais fornecidas
    const matchedUser = existingUsers.find((user: User) => user.username === username && user.password === password);
    return matchedUser || false; // Devolve o utilizador ou false

    return matchedUser || false; // Retorna o utilizador ou false se não encontrar
  }

  /**
   * Atualiza o perfil de um utilizador existente.
   * @param username Nome de utilizador.
   * @param updates Campos a atualizar.
   * @returns true se atualizado com sucesso, false caso contrário.
   */
  // Atualiza o perfil de um utilizador existente
  async updateUserProfile(username: string, updates: Partial<User>) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    const existingUsers = await this.storage['get']('users') || [];

    // Procura o índice do utilizador
    const userIndex = existingUsers.findIndex((user: User) => user.username === username);
    
    if (userIndex !== -1) {
      // Atualiza os dados do utilizador mantendo os anteriores
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
      await this.storage['set']('users', existingUsers);
      return true;
    }

    return false;
  }

  /**
   * Verifica se já existe um utilizador com o nome fornecido.
   * @param username Nome de utilizador.
   * @returns true se existir, false caso contrário.
   */
  // Verifica se um utilizador já existe
  async checkExistingUser(username: string): Promise<boolean> {
    const user = await this.getUser(username);
    return !!user;
  }
  
  /**
   * Obtém a lista de todos os utilizadores.
   * @returns Array de utilizadores.
   */

  // Retorna todos os utilizadores
  async getUsers(): Promise<User[]> {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    return await this.storage.get('users') || [];
  }
  
  /**
   * Obtém um utilizador pelo nome de utilizador.
   * @param username Nome de utilizador.
   * @returns O utilizador correspondente ou undefined.
   */

  // Retorna um utilizador específico pelo username
  async getUser(username: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    const existingUsers = await this.storage['get']('users') || [];

    return existingUsers.find((user: User) => user.username === username);
  }
}
