
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PrecoNEService } from 'src/app/services/preco-ne.service';

@Component({
  selector: 'app-nova-encomenda-dois',
  templateUrl: './nova-encomenda-dois.page.html',
  styleUrls: ['./nova-encomenda-dois.page.scss'],
})
export class NovaEncomendaDoisPage implements OnInit {
  public mostrarCartaoOferta: boolean = false;
  messageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private preconeService: PrecoNEService
  ) {
    this.messageForm = this.formBuilder.group({
      de: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      para: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      mensagem: [''],
    });
  }

  ngOnInit() {}

  async submitForm() {
    if (this.messageForm.valid) {
      const formData = this.messageForm.value;
      console.log(formData);
      this.goToNovaEncomendaTresPage();
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

  goToNovaEncomendaTresPage() {
    this.router.navigate(['/nova-encomenda-tres']);
  }
}
