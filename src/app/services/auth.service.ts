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
    profilePicture: '',
    birthDate: '',
    points: 0
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
    }
    this.initialized = true;
  }

  async getCurrentUser() {
    await this.storage.create();
    const user = await this.storage.get('currentUser');
    if (!user) return this.currentUser;

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

  async setCurrentUser(userData: any) {
    await this.initializeService();
    this.currentUser = {
      username: userData.username,
      fullName: userData.fullName,
      email: userData.email,
      profilePicture: userData.profilePicture || '',
      birthDate: userData.birthDate || '',
      points: userData.points || 0
    };

    await this.storage.set('currentUser', this.currentUser);
    await this.criarautentService.updateUserProfile(userData.username, {
      fullName: userData.fullName,
      email: userData.email,
      profilePicture: userData.profilePicture,
      birthDate: userData.birthDate, 
      points: userData.points || 0
    });

  }

  async updateProfilePicture(imageData: string) {
    this.currentUser.profilePicture = imageData;
    await this.storage.set('currentUser', this.currentUser);
    await this.criarautentService.updateUserProfile(this.currentUser.username, {
      profilePicture: imageData
    });
  }

  async updatePoints(newPoints: number) {
    this.currentUser.points = newPoints;
    await this.storage.set('currentUser', this.currentUser);
    await this.criarautentService.updateUserProfile(this.currentUser.username, {
      points: newPoints
    });
  }

  async logout() {
    await this.storage.remove('currentUser');
    this.currentUser = {
      username: '',
      fullName: '',
      email: '',
      profilePicture: '',
      birthDate: '',
      points: 0
    };
    this.initialized = false;
    localStorage.setItem('userLoggedOut', Date.now().toString());
  }
}
