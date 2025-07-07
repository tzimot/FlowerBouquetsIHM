import { Component, OnInit } from '@angular/core'; // Importa o decorador Component e OnInit do Angular
import { Router } from '@angular/router'; // Importa o Router para navegação entre páginas
import { AlertController } from '@ionic/angular'; // Importa o controlador de alertas do Ionic
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa classes para construção e validação de formulários

@Component({
  selector: 'app-top-vendas-um', // Seletor do componente
  templateUrl: './personalizar-um.page.html', // Caminho do template HTML
  styleUrls: ['./personalizar-um.page.scss'], // Caminho dos estilos CSS/SCSS
})
export class PersonalizarUmPage implements OnInit {
  form: FormGroup; // Declaração do grupo de formulários
  adicionarCartao: boolean = false; // Flag para saber se o cartão deve ser adicionado
  precoTotal: number = 0; // Variável para guardar o preço total

  constructor(
    private router: Router, // Injeta o serviço de navegação
    private alertController: AlertController, // Injeta o serviço de alertas
    private formBuilder: FormBuilder // Injeta o construtor de formulários
  ) {
    // Inicializa o formulário com validações para cada campo
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])], // Nome obrigatório, só letras e espaços
      numeroTelemovel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])], // Telemóvel obrigatório, 9 dígitos
      rua: ['', Validators.required], // Rua obrigatória
      numeroPorta: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])], // Número da porta obrigatório, só números
      codigoPostal: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{4}-[0-9]{3}')])], // Código postal obrigatório, formato 0000-000
      localidade: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])], // Localidade obrigatória, só letras e espaços
      nota: ['', Validators.compose([Validators.minLength(10)])] // Nota opcional, mínimo 10 caracteres
    });
  }

  ngOnInit() {} // Método de ciclo de vida, executa ao iniciar o componente

  async submitForm() {
    if (this.form.invalid) { // Verifica se o formulário é inválido
      this.showAlert('Preencha todos os campos.', 'Erro'); // Mostra alerta se houver erro
      return;
    }

    if (this.adicionarCartao) { // Se o utilizador quiser adicionar cartão
      this.precoTotal += 0.99; // Acrescenta o valor do cartão ao preço total
      this.router.navigate(['/personalizar-dois']); // Navega para a próxima página
    } else {
      this.router.navigate(['/personalizar-tres']); // Caso contrário, navega para outra página
    }
  }

  async showAlert(message: string, header: string) {
    // Cria e apresenta um alerta com a mensagem e o cabeçalho recebidos
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToPersonalizarDoisPage() {
    this.router.navigate(['/personalizar-dois']); // Navega diretamente para a página "personalizar-dois"
  }
}
