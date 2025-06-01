import { Injectable } from '@angular/core';
// Importa o decorador Injectable para marcar esta classe como injetável

import { Storage } from '@ionic/storage-angular';
// Importa o serviço de armazenamento do Ionic

@Injectable({
  providedIn: 'root'
})
// Declara o serviço como disponível globalmente na app (singleton)

export class CriarautentService {
  private storageInitialized: boolean = false;
  // Variável privada que indica se o armazenamento já foi inicializado

  constructor(private storage: Storage) {
    this.initStorage();
    // Ao construir o serviço, inicializa o armazenamento
  }

  private async initStorage() {
    await this.storage.create();
    // Cria/Inicializa o armazenamento

    this.storageInitialized = true;
    // Marca como inicializado
  }

  async criarConta(username: string, password: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
      // Garante que o armazenamento está pronto antes de continuar
    }

    const existingUsers = await this.storage.get('users') || [];
    // Vai buscar a lista de utilizadores existentes ou usa um array vazio

    const newUser = { username, password };
    // Cria um novo objeto utilizador

    existingUsers.push(newUser);
    // Adiciona o novo utilizador à lista

    await this.storage.set('users', existingUsers);
    // Guarda novamente a lista atualizada no armazenamento
  }

  async autenticar(username: string, password: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
      // Garante que o armazenamento está pronto
    }

    const existingUsers = await this.storage.get('users') || [];
    // Vai buscar os utilizadores existentes

    const matchedUser = existingUsers.find((user: { username: string; password: string }) =>
      user.username === username && user.password === password
    );
    // Procura um utilizador com username e password correspondentes

    return !!matchedUser;
    // Devolve true se encontrou o utilizador, false caso contrário
  }

  async checkExistingUser(username: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
      // Garante que o armazenamento está pronto
    }

    const existingUsers = await this.storage.get('users') || [];
    // Vai buscar os utilizadores existentes

    const matchedUser = existingUsers.find((user: { username: string; password: string }) =>
      user.username === username
    );
    // Procura um utilizador com o username fornecido

    return !!matchedUser;
    // Devolve true se já existir esse username, false se não existir
  }
}
