import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface User {
  username: string;
  password: string;
  profilePicture?: string;
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
    return matchedUser || false; // Return the full user object or false
  }

  async updateUserProfile(username: string, updates: Partial<User>) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    const existingUsers = await this.storage['get']('users') || [];
    const userIndex = existingUsers.findIndex((user: User) => user.username === username);
    
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
      await this.storage['set']('users', existingUsers);
      return true;
    }
    return false;
  }

  async checkExistingUser(username: string): Promise<boolean> {
    const user = await this.getUser(username);
    return !!user;
  }
  
  async getUsers(): Promise<User[]> {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    return await this.storage.get('users') || [];
  }
  

  async getUser(username: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    const existingUsers = await this.storage['get']('users') || [];
    return existingUsers.find((user: User) => user.username === username);
  }
}
