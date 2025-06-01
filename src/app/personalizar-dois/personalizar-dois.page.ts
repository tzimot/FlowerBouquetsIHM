// Importa os módulos necessários do Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

// Declaração do componente Angular com o seletor, template e estilos associados
@Component({
  selector: 'app-personalizar-dois',               // Nome usado no HTML para referenciar este componente
  templateUrl: './personalizar-dois.page.html',     // Caminho para o ficheiro HTML associado
  styleUrls: ['./personalizar-dois.page.scss'],     // Caminho para o ficheiro de estilos (SCSS)
})
export class PersonalizarDoisPage implements OnInit {

  // Declaração do formulário como uma propriedade da classe
  messageForm: FormGroup;

  // Construtor onde são injetados os serviços necessários
  constructor(
    private formBuilder: FormBuilder,               // Usado para criar o formulário reativo
    private alertController: AlertController,       // Usado para apresentar alertas ao utilizador
    private router: Router                          // Usado para navegar entre páginas
  ) {
    // Inicializa o formulário com os campos e as suas validações
    this.messageForm = this.formBuilder.group({
      de: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],    // Campo "De", obrigatório e apenas letras
      para: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],  // Campo "Para", obrigatório e apenas letras
      mensagem: ['']                                                              // Campo opcional "Mensagem"
    });
  }

  // Método chamado quando a página é inicializada
  ngOnInit() {}

  // Método que trata do envio do formulário
  async submitForm() {
    if (this.messageForm.valid) {
      // Se o formulário for válido, guarda os dados e navega para a próxima página
      const formData = this.messageForm.value;   // Guarda os dados preenchidos pelo utilizador
      console.log(formData);                     // Mostra no console (debug)
      this.router.navigate(['/personalizar-tres']); // Navega para a próxima página
    } else {
      // Se for inválido, mostra um alerta de erro
      await this.showAlert('Formulário inválido', 'Preencha corretamente os campos "De" e "Para".');
    }
  }

  // Método que mostra um alerta com um cabeçalho e mensagem
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,              // Título do alerta
      message,             // Conteúdo do alerta
      buttons: ['OK']      // Botão para fechar o alerta
    });
    await alert.present(); // Apresenta o alerta
  }
}
