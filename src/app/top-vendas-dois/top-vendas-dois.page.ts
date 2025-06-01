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
      de: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Permitido espaço para nomes compostos
      para: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      mensagem: ['', Validators.maxLength(500)] // Limite máximo para mensagem
    });
  }

  ngOnInit() {}

  async submitForm() {
    if (this.messageForm.valid) {
      const formData = this.messageForm.value;
      console.log(formData);
      await this.showAlert('Sucesso', 'Mensagem enviada com sucesso!'); // Feedback de sucesso
      this.router.navigate(['/top-vendas-tres']); // Navega após confirmação
    } else {
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
