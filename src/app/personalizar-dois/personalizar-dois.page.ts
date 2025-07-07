import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

// Declaração do componente Angular/Ionic
@Component({
  selector: 'app-personalizar-dois',
  templateUrl: './personalizar-dois.page.html',
  styleUrls: ['./personalizar-dois.page.scss'],
})
export class PersonalizarDoisPage implements OnInit {
  // Controla a exibição do cartão de oferta
  public mostrarCartaoOferta: boolean = false;

  // Formulário reativo para mensagem
  messageForm: FormGroup;

  // Injeta dependências necessárias: FormBuilder, AlertController e Router
  constructor(
    private formBuilder: FormBuilder, 
    private alertController: AlertController, 
    private router: Router
  ) { 
    // Inicializa o formulário com validações:
    // - 'de' e 'para': obrigatórios, apenas letras e espaços
    // - 'mensagem': máximo 500 caracteres
    this.messageForm = this.formBuilder.group({
      de: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Permitido espaço para nomes compostos
      para: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      mensagem: ['', Validators.maxLength(500)] // Limite máximo para mensagem
    });
  }

  // Método do ciclo de vida do Angular, chamado na inicialização
  ngOnInit() {}

  // Envia o formulário
  async submitForm() {
    if (this.messageForm.valid) {
      // Se válido, mostra alerta de sucesso e navega para próxima página
      const formData = this.messageForm.value;
      console.log(formData);
      await this.showAlert('Sucesso', 'Mensagem enviada com sucesso!'); // Feedback de sucesso
      this.router.navigate(['/personalizar-tres']); // Navega após confirmação
    } else {
      // Se inválido, mostra alerta de erro
      await this.showAlert('Formulário inválido', 'Preencha corretamente os campos "De" e "Para".');
    }
  }

  // Exibe um alerta com título e mensagem
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  
  // Navega diretamente para a página 'personalizar-tres'
  goToPersonalizarTresPage() {
    this.router.navigate(['/personalizar-tres']);
  }
}
