import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CriarautentService } from './criarautent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = {
    username: '',
    fullName: '',
    email: '',
    profilePicture: ''
  };
  private initialized = false;

  constructor(
    private storage: Storage,
    private criarautentService: CriarautentService
  ) {}

  private async initializeService() {
    if (this.initialized) return;
    
    await this.storage.create();
    const user = await this.storage.get('currentUser');
    if (user) {
      // Get the latest user data from criarautentService
      const updatedUser = await this.criarautentService.getUser(user.username);
      if (updatedUser) {
        this.currentUser = {
          username: updatedUser.username,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          profilePicture: updatedUser.profilePicture || ''
        };
      }
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
      email: userData.email,
      profilePicture: userData.profilePicture || ''
    };

    await this.storage.set('currentUser', this.currentUser);
    // Also update the user in the main users storage
    await this.criarautentService.updateUserProfile(userData.username, {
      fullName: userData.fullName,
      email: userData.email,
      profilePicture: userData.profilePicture
    });
  }

  async updateProfilePicture(imageData: string) {
    await this.initializeService();
    this.currentUser.profilePicture = imageData;
    await this.storage.set('currentUser', this.currentUser);
    // Also update the user in the main users storage
    await this.criarautentService.updateUserProfile(this.currentUser.username, {
      profilePicture: imageData
    });
  }

  async logout() {
    await this.initializeService();
    this.currentUser = {
      username: '',
      fullName: '',
      email: '',
      profilePicture: ''
    };
    await this.storage.remove('currentUser');
  }
}
