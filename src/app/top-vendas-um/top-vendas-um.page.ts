import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-top-vendas-um',
  templateUrl: './top-vendas-um.page.html',
  styleUrls: ['./top-vendas-um.page.scss'],
})
export class TopVendasUmPage implements OnInit {
  form: FormGroup;
  adicionarCartao: boolean = false;
  precoTotal: number = 0;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      numeroTelemovel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])],
      rua: ['', Validators.required],
      numeroPorta: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      codigoPostal: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{4}-[0-9]{3}')])],
      localidade: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      nota: ['', Validators.compose([Validators.minLength(10)])]
    });
  }

  ngOnInit() {}

  async submitForm() {
    if (this.form.invalid) {
      this.showAlert('Preencha todos os campos.', 'Erro');
      return;
    }

    if (this.adicionarCartao) {
      this.precoTotal += 0.99;
      this.router.navigate(['/top-vendas-dois']);
    } else {
      this.router.navigate(['/top-vendas-tres']);
    }
  }

  async showAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToTopVendasDoisPage() {
    this.router.navigate(['/top-vendas-dois']);
  }
}
