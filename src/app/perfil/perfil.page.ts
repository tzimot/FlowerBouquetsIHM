import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData = {
    username: '',
    fullName: '',
    email: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Get user data from AuthService
    this.userData = this.authService.getCurrentUser();
  }
}
