import { Component, OnInit } from '@angular/core'; // Importa os decoradores e interfaces do Angular
import { Router } from '@angular/router'; // Importa para navegação entre páginas
import { AlertController } from '@ionic/angular'; // Importa controlador para alertas na interface Ionic
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa para criação e validação de formulários

@Component({
  selector: 'app-top-vendas-um', // Define o seletor HTML do componente
  templateUrl: './top-vendas-um.page.html', // Aponta para o ficheiro HTML associado
  styleUrls: ['./top-vendas-um.page.scss'], // Aponta para o ficheiro CSS associado
})
export class TopVendasUmPage implements OnInit { // Declara a classe do componente que implementa OnInit
  form: FormGroup; // Variável para o formulário reativo

  constructor(private router: Router, private alertController: AlertController, private formBuilder: FormBuilder) {
    // Cria o formulário com validações para cada campo
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])], // Nome obrigatório, só letras e espaços
      numeroTelemovel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])], // Número obrigatório, exatamente 9 dígitos
      rua: ['', Validators.required], // Rua obrigatória, sem padrão específico
      numeroPorta: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])], // Número porta obrigatório, só dígitos
      codigoPostal: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])], // Código postal obrigatório, só dígitos
      localidade: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])] // Localidade obrigatória, só letras e espaços
    });
   }

  ngOnInit() {
    // Método vazio, executa ao iniciar o componente (aqui não faz nada)
  }

  async submitForm() {
    if (this.form.invalid) { // Verifica se o formulário está inválido
      this.showAlert('Preencha todos os campos.', 'Erro'); // Mostra alerta se inválido
      return; // Sai da função para não continuar
    }

    const formData = this.form.value; // Obtém os dados do formulário
    const message = `  // Cria mensagem formatada com os dados do formulário
      Nome: ${formData.nome}<br>
      Número Telemóvel: ${formData.numeroTelemovel}<br>
      Rua: ${formData.rua}<br>
      Número de Porta: ${formData.numeroPorta}<br>
      Código Postal: ${formData.codigoPostal}<br>
      Localidade: ${formData.localidade}
    `;
    this.showAlert(message, 'Dados do Formulário'); // Mostra alerta com os dados

    this.router.navigate(['/top-vendas-dois']); // Navega para a página seguinte
  }

  async showAlert(message: string, header: string) {
    // Cria e apresenta um alerta com o título e mensagem dados
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'], // Botão para fechar o alerta
    });
    await alert.present(); // Apresenta o alerta na UI
  }
}
