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

  async criarConta(username: string, password: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    const existingUsers = await this.storage.get('users') || [];
    const newUser = { username, password };
    existingUsers.push(newUser);
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

    return !!matchedUser; // Returns true if user is found, false otherwise
  }

  async checkExistingUser(username: string) {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
  
    const existingUsers = await this.storage.get('users') || [];
    const matchedUser = existingUsers.find((user: { username: string; password: string }) =>
      user.username === username
    );
  
    return !!matchedUser; // Returns true if user is found, false otherwise
  }



}
