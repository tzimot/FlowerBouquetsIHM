
import { Component, OnInit } from '@angular/core'; // Importa Component e OnInit do Angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa classes para formulários reativos
import { AlertController } from '@ionic/angular'; // Importa controlador de alertas do Ionic
import { Router } from '@angular/router'; // Importa roteador para navegação entre páginas
import { PrecoNEService } from 'src/app/services/preco-ne.service';

@Component({
  selector: 'app-nova-encomenda-dois', // Define o seletor do componente
  templateUrl: './nova-encomenda-dois.page.html', // Define o template HTML
  styleUrls: ['./nova-encomenda-dois.page.scss'], // Define os estilos CSS
})
export class NovaEncomendaDoisPage implements OnInit { // Declara a classe do componente

  messageForm: FormGroup; // Variável que representa o formulário


  constructor(
    private formBuilder: FormBuilder, 
    private alertController: AlertController, 
    private router: Router,
    private preconeService: PrecoNEService
  ) { 
    this.messageForm = this.formBuilder.group({
      de: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      para: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      mensagem: ['']
    });
  }
}

  ngOnInit() { } // Método chamado na inicialização do componente (vazio aqui)

  async submitForm() { // Método para submeter o formulário
    if (this.messageForm.valid) { // Se o formulário for válido
      const formData = this.messageForm.value; // Obtém os dados do formulário
      console.log(formData); // Mostra os dados no console para debug
      this.router.navigate(['/nova-encomenda-tres']); // Navega para a página seguinte
    } else {
      await this.showAlert('Formulário inválido', 'Preencha corretamente os campos "De" e "Para".'); // Exibe alerta se inválido
    }
  }

  async showAlert(header: string, message: string) { // Método para exibir alertas
    const alert = await this.alertController.create({ // Cria o alerta
      header, // Título do alerta
      message, // Mensagem do alerta
      buttons: ['OK'] // Botão para fechar o alerta
    });
    await alert.present(); // Apresenta o alerta ao utilizador
  }

  goToNovaEncomendaTresPage() {
    this.router.navigate(['/nova-encomenda-tres']);
  }
}
