import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.page.html',
  styleUrls: ['./cancelar.page.scss'],
})
export class CancelarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToInicio() {
    this.router.navigate(['/home']); // Replace '/finalizar-dois' with the actual route path of the "finalizar-um" page
  }

}
