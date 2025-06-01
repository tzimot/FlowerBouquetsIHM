import { Component, OnInit } from '@angular/core'; // Importa funcionalidades de componente e ciclo de vida
import { Router } from '@angular/router'; // Importa o Router para navegação entre páginas
import { AlertController } from '@ionic/angular'; // Importa controlador de alertas do Ionic
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa classes para criação e validação de formulários

@Component({
  selector: 'app-nova-encomenda-um', // Seletor do componente
  templateUrl: './nova-encomenda-um.page.html', // Caminho do template HTML
  styleUrls: ['./nova-encomenda-um.page.scss'], // Caminho do ficheiro de estilos
})
export class NovaEncomendaUmPage implements OnInit {
  form: FormGroup; // Declaração do formulário

  constructor(private router: Router, private alertController: AlertController, private formBuilder: FormBuilder) { // Injeta dependências
    this.form = this.formBuilder.group({ // Cria o grupo de campos do formulário com validações
      nome: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])], // Nome obrigatório e só letras/espacos
      numeroTelemovel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])], // Número com 9 dígitos
      rua: ['', Validators.required], // Rua obrigatória
      numeroPorta: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])], // Só números
      codigoPostal: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])], // Só números
      localidade: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])] // Só letras/espacos
    });
  }

  ngOnInit() {} // Método de inicialização (vazio neste caso)

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
}
