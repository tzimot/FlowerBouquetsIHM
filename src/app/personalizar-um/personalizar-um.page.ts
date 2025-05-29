import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-personalizar-um',
  templateUrl: './personalizar-um.page.html',
  styleUrls: ['./personalizar-um.page.scss'],
})
export class PersonalizarUmPage implements OnInit {
  form: FormGroup;

  

  constructor(private router: Router, private alertController: AlertController, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      numeroTelemovel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])],
      rua: ['', Validators.required],
      numeroPorta: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      codigoPostal: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      localidade: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])]
    });
   }

  

  
  ngOnInit() { }
  


  async submitForm() {
    if (this.form.invalid) {
      this.showAlert('Preencha todos os campos.', 'Erro');
      return;
    }



    const formData = this.form.value;
    const message = `
      Nome: ${formData.nome}<br>
      Número Telemóvel: ${formData.numeroTelemovel}<br>
      Rua: ${formData.rua}<br>
      Número de Porta: ${formData.numeroPorta}<br>
      Código Postal: ${formData.codigoPostal}<br>
      Localidade: ${formData.localidade}
    `;
    this.showAlert(message, 'Dados do Formulário');

    this.router.navigate(['/personalizar-dois']);
  }

  async showAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


  

    

}
