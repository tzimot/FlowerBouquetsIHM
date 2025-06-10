
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrecoNEService } from 'src/app/services/preco-ne.service';

@Component({
  selector: 'app-nova-encomenda-um',
  templateUrl: './nova-encomenda-um.page.html',
  styleUrls: ['./nova-encomenda-um.page.scss'],
})
export class NovaEncomendaUmPage implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private preconeService: PrecoNEService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      numeroTelemovel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])],
      rua: ['', Validators.required],
      numeroPorta: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      codigoPostal: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{4}-[0-9]{3}')])],
      localidade: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])]
    });
  }

  ngOnInit() {}

  async submitForm() {
    if (this.form.invalid) { // Se o formulário for inválido
      this.showAlert('Preencha todos os campos.', 'Erro'); // Mostra alerta de erro
      return;
    }

    const formData = this.form.value; // Obtém os dados do formulário
    const message = ` 
      Nome: ${formData.nome}<br> 
      Número Telemóvel: ${formData.numeroTelemovel}<br> 
      Rua: ${formData.rua}<br> 
      Número de Porta: ${formData.numeroPorta}<br> 
      Código Postal: ${formData.codigoPostal}<br> 
      Localidade: ${formData.localidade} 
    `; // Monta mensagem com os dados

    this.showAlert(message, 'Dados do Formulário'); // Mostra os dados num alerta
    this.router.navigate(['/nova-encomenda-dois']); // Redireciona para a próxima página
  }

  async showAlert(message: string, header: string) { // Método para mostrar um alerta
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present(); // Apresenta o alerta
  }

  goToNovaEncomendaDoisPage() {
    this.router.navigate(['/nova-encomenda-dois']);
  }

}
