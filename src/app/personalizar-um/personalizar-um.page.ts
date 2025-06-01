import { Component, OnInit } from '@angular/core';
// Importa decorador e interface para criar componentes Angular

import { Router } from '@angular/router';
// Importa serviço para navegação entre páginas

import { AlertController } from '@ionic/angular';
// Importa controlador para criar alertas na interface Ionic

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importa classes para construir e validar formulários reativos

@Component({
  selector: 'app-personalizar-um',
  templateUrl: './personalizar-um.page.html',
  styleUrls: ['./personalizar-um.page.scss'],
})
export class PersonalizarUmPage implements OnInit {
  form: FormGroup;
  // Declara o formulário reativo do componente

  constructor(private router: Router, private alertController: AlertController, private formBuilder: FormBuilder) {
    // Injeta serviços de navegação, alertas e criação de formulários

    this.form = this.formBuilder.group({
      // Cria o grupo de controles do formulário com validações

      nome: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      // Campo 'nome': obrigatório, só letras e espaços

      numeroTelemovel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])],
      // Campo 'número telemóvel': obrigatório, exatamente 9 dígitos

      rua: ['', Validators.required],
      // Campo 'rua': obrigatório, sem padrão específico

      numeroPorta: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      // Campo 'número da porta': obrigatório, só números

      codigoPostal: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      // Campo 'código postal': obrigatório, só números

      localidade: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      // Campo 'localidade': obrigatório, só letras e espaços
    });
  }

  ngOnInit() { }
  // Método do ciclo de vida, executa ao iniciar o componente (vazio aqui)

  async submitForm() {
    // Função chamada ao submeter o formulário

    if (this.form.invalid) {
      // Verifica se o formulário é inválido

      this.showAlert('Preencha todos os campos.', 'Erro');
      // Mostra alerta a avisar para preencher todos os campos corretamente

      return;
      // Sai da função para evitar continuar o processamento
    }

    const formData = this.form.value;
    // Obtém os dados preenchidos no formulário

    const message = `
      Nome: ${formData.nome}<br>
      Número Telemóvel: ${formData.numeroTelemovel}<br>
      Rua: ${formData.rua}<br>
      Número de Porta: ${formData.numeroPorta}<br>
      Código Postal: ${formData.codigoPostal}<br>
      Localidade: ${formData.localidade}
    `;
    // Formata uma mensagem com os dados para exibir no alerta

    this.showAlert(message, 'Dados do Formulário');
    // Mostra a mensagem com os dados preenchidos

    this.router.navigate(['/personalizar-dois']);
    // Navega para a página seguinte 'personalizar-dois'
  }

  async showAlert(message: string, header: string) {
    // Função para criar e mostrar alertas na interface

    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
    // Exibe o alerta ao utilizador
  }
}
