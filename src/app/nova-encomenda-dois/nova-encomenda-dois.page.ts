// Importa os módulos e serviços necessários do Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PrecoNEService } from 'src/app/services/preco-ne.service';

// Declaração do componente Angular com os seus metadados
@Component({
  selector: 'app-nova-encomenda-dois', // Seletor do componente
  templateUrl: './nova-encomenda-dois.page.html', // Caminho do template HTML
  styleUrls: ['./nova-encomenda-dois.page.scss'], // Caminho do ficheiro de estilos
})
export class NovaEncomendaDoisPage implements OnInit {
  public mostrarCartaoOferta: boolean = false; // Controla a exibição do cartão oferta
  messageForm: FormGroup; // Formulário reativo para os campos da mensagem

  // Injeta os serviços necessários no construtor
  constructor(
    private formBuilder: FormBuilder, // Para criar o formulário reativo
    private alertController: AlertController, // Para mostrar alertas
    private router: Router, // Para navegação entre páginas
    private preconeService: PrecoNEService // Serviço para preços (não utilizado aqui)
  ) {
    // Inicializa o formulário com validações
    this.messageForm = this.formBuilder.group({
      de: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], // Campo "De" obrigatório e só letras
      para: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], // Campo "Para" obrigatório e só letras
      mensagem: [''], // Campo "Mensagem" opcional
    });
  }

  ngOnInit() {} // Método do ciclo de vida, executado na inicialização

  // Método chamado ao submeter o formulário
  async submitForm() {
    if (this.messageForm.valid) { // Verifica se o formulário é válido
      const formData = this.messageForm.value; // Obtém os dados do formulário
      console.log(formData); // Mostra os dados no console
      this.goToNovaEncomendaTresPage(); // Navega para a próxima página
    } else {
      // Mostra alerta se o formulário for inválido
      await this.showAlert('Formulário inválido', 'Preencha corretamente os campos "De" e "Para".');
    }
  }

  // Método para mostrar um alerta ao utilizador
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present(); // Apresenta o alerta
  }

  // Método para navegar para a página seguinte
  goToNovaEncomendaTresPage() {
    this.router.navigate(['/nova-encomenda-tres']);
  }
}
