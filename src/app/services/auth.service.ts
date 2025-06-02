import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = {
    username: '',
    fullName: '',
    email: ''
  };
  private initialized = false;

  constructor(private storage: Storage) {}

  private async initializeService() {
    if (this.initialized) return;
    
    await this.storage.create();
    const user = await this.storage.get('currentUser');
    if (user) {
      this.currentUser = user;
    }
    this.initialized = true;
  }

  async getCurrentUser() {
    await this.initializeService();
    return this.currentUser;
  }

  async setCurrentUser(userData: any) {
    await this.initializeService();
    this.currentUser = {
      username: userData.username,
      fullName: userData.fullName,
      email: userData.email
    };

    await this.storage.set('currentUser', this.currentUser);
  }
}
