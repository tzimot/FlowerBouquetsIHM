import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = {
    username: '',
    fullName: '',
    email: ''
  };

  constructor() {}

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(userData: any) {
    this.currentUser = {
      username: userData.username,
      fullName: userData.fullName,
      email: userData.email
    };
  }
}