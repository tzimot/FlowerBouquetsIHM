import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obrigado',
  templateUrl: './obrigado.page.html',
  styleUrls: ['./obrigado.page.scss'],
})
export class ObrigadoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToInicio() {
    this.router.navigate(['/home']); 
  }

}
