// Importa os módulos e serviços necessários do Angular e Ionic 
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { PrecoNEService } from 'src/app/services/preco-ne.service'; 

@Component({
  selector: 'app-nova-encomenda-um', // Define o seletor do componente
  templateUrl: './nova-encomenda-um.page.html', // Caminho para o template HTML
  styleUrls: ['./nova-encomenda-um.page.scss'], // Caminho para os estilos CSS
})
export class NovaEncomendaUmPage implements OnInit {
  form: FormGroup; // Declara o formulário reativo

  constructor(
    private router: Router, // Injeta o serviço de navegação
    private alertController: AlertController, // Injeta o controlador de alertas
    private formBuilder: FormBuilder, // Injeta o construtor de formulários
    private preconeService: PrecoNEService // Injeta o serviço de preços
  ) {
    // Inicializa o formulário com validações para cada campo
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])], // Nome obrigatório, só letras e espaços
      numeroTelemovel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])], // Telemóvel obrigatório, 9 dígitos
      rua: ['', Validators.required], // Rua obrigatória
      numeroPorta: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])], // Número de porta obrigatório, só dígitos
      codigoPostal: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{4}-[0-9]{3}')])], // Código postal obrigatório, formato 0000-000
      localidade: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])], // Localidade obrigatória, só letras e espaços
      nota: ['', Validators.compose([Validators.minLength(10)])] // Nota opcional, mínimo 10 caracteres
    });
  }

  ngOnInit() {} // Método do ciclo de vida, executa ao iniciar o componente

  async submitForm() {
    if (this.form.invalid) { // Verifica se o formulário é inválido
      this.showAlert('Preencha todos os campos.', 'Erro'); // Mostra alerta de erro se houver campos inválidos
      return;
    }

    const formData = this.form.value; // Obtém os valores do formulário
    const message = ` 
      Nome: ${formData.nome}<br> 
      Número Telemóvel: ${formData.numeroTelemovel}<br> 
      Rua: ${formData.rua}<br> 
      Número de Porta: ${formData.numeroPorta}<br> 
      Código Postal: ${formData.codigoPostal}<br> 
      Localidade: ${formData.localidade} 
    `; // Cria mensagem com os dados principais do formulário

    this.showAlert(message, 'Dados do Formulário'); // Mostra os dados num alerta
    this.router.navigate(['/nova-encomenda-dois']); // Avança para a próxima página
  }

  async showAlert(message: string, header: string) { // Mostra um alerta com mensagem e título recebidos
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present(); // Exibe o alerta
  }

  goToNovaEncomendaDoisPage() {
    this.router.navigate(['/nova-encomenda-dois']); // Navega diretamente para a próxima página
  }

}
