import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CriarautentService {
  private storageInitialized: boolean = false;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    this.storageInitialized = true;
  }

  async criarConta(userData: any) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    const existingUsers = await this.storage.get('users') || [];
    existingUsers.push(userData);
    await this.storage.set('users', existingUsers);
  }

  async autenticar(username: string, password: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    const existingUsers = await this.storage.get('users') || [];
    const matchedUser = existingUsers.find((user: { username: string; password: string }) =>
      user.username === username && user.password === password
    );

    return !!matchedUser;
  }

  async checkExistingUser(username: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    const existingUsers = await this.storage.get('users') || [];
    const matchedUser = existingUsers.find((user: { username: string }) =>
      user.username === username
    );

    return !!matchedUser;
  }

  async getUsers() {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    return await this.storage.get('users') || [];
  }

  async getUser(username: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
  
    const users = await this.storage.get('users') || [];
    return users.find((user: any) => user.username === username);
  }
  
  async updateUserProfile(username: string, updates: Partial<any>) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
  
    const users = await this.storage.get('users') || [];
  
    const updatedUsers = users.map((user: any) => {
      if (user.username === username) {
        return { ...user, ...updates };
      }
      return user;
    });
  
    await this.storage.set('users', updatedUsers);
  }
  
  
}
