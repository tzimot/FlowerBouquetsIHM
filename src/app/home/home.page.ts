import { CriarautentService } from 'src/app/services/criarautent.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit  } from '@angular/core';





@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
  }



  logout() {
    this.router.navigate(['/login']);
  }

}
