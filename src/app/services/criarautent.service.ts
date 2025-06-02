import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface User {
  username: string;
  password: string;
  [key: string]: any; // Allow for additional properties
}

@Injectable({
  providedIn: 'root'
})
export class CriarautentService {
  private storageInitialized: boolean = false;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage['create']();
    this.storageInitialized = true;
  }

  async criarConta(userData: User) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    const existingUsers = await this.storage['get']('users') || [];
    existingUsers.push(userData);
    await this.storage['set']('users', existingUsers);
  }

  async autenticar(username: string, password: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    const existingUsers = await this.storage['get']('users') || [];
    const matchedUser = existingUsers.find((user: User) => user.username === username && user.password === password);
    return !!matchedUser;
  }

  async checkExistingUser(username: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    const existingUsers = await this.storage['get']('users') || [];
    const matchedUser = existingUsers.find((user: User) => user.username === username);
    return !!matchedUser;
  }

  async getUsers(): Promise<User[]> {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    const users = await this.storage['get']('users');
    return users || [];
  }
}
