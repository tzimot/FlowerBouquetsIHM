import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-top-vendas-dois',
  templateUrl: './top-vendas-dois.page.html',
  styleUrls: ['./top-vendas-dois.page.scss'],
})
export class TopVendasDoisPage implements OnInit {


  messageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private router: Router) { 
    this.messageForm = this.formBuilder.group({
      de: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      para: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      mensagem: ['']
    });
  }

  ngOnInit() {
  }

  async submitForm() {
    if (this.messageForm.valid) {
      // Form is valid, you can proceed with the submission
      const formData = this.messageForm.value;
      console.log(formData);
       // Redirect to personalizar-tres page
    this.router.navigate(['/top-vendas-tres']);
    } else {
      // Form is invalid, display an error alert
      await this.showAlert('Formulário inválido', 'Preencha corretamente os campos "De" e "Para".');
    }
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
