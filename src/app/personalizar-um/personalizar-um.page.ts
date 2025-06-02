import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-top-vendas-um',
  templateUrl: './personalizar-um.page.html',
  styleUrls: ['./personalizar-um.page.scss'],
})
export class PersonalizarUmPage implements OnInit {
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
      codigoPostal: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      localidade: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])]
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
      this.router.navigate(['/personalizar-dois']);
    } else {
      this.router.navigate(['/personalizar-tres']);
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

  goToPersonalizarDoisPage() {
    this.router.navigate(['/personalizar-dois']);
  }
}
