import { Component, OnInit } from '@angular/core'; // Importa para criar componentes
import { Storage } from '@ionic/storage-angular'; // Importa para aceder ao armazenamento local
import { NavController, AlertController } from '@ionic/angular'; // Importa navegação e alertas do Ionic
import { CriarautentService } from 'src/app/services/criarautent.service'; // Importa serviço para autenticação e criação de conta

@Component({
  selector: 'app-criar-conta', // Seletor do componente no HTML
  templateUrl: './criar-conta.page.html', // Ficheiro HTML do componente
  styleUrls: ['./criar-conta.page.scss'], // Ficheiro do css
})
export class CriarContaPage implements OnInit { // Define a classe do componente com OnInit

  nome: string = ''; // Variável para o nome do utilizador
  username: string = ''; // Variável para o nome de utilizador
  email: string = ''; // Variável para o email
  password: string = ''; // Variável para a password
  morada?: string; // Variável opcional para morada

  // Campos para a data de nascimento
  anoSelecionado?: number;
  mesSelecionado?: number; 
  diaSelecionado?: number;

  anosDisponiveis: number[] = []; // Array para os anos disponíveis no selector
  meses: number[] = Array.from({ length: 12 }, (_, i) => i + 1); // Array dos meses de 1 a 12
  dias: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // Array dos dias de 1 a 31

  constructor(
    private storage: Storage, // Injeta serviço de armazenamento local
    private navCtrl: NavController, // Injeta serviço de navegação
    private criarAutentService: CriarautentService, // Injeta serviço para autenticação/criação
    private alertController: AlertController // Injeta controlador para mostrar alertas
  ) {}

  async criarconta() {
    if (!this.nome || !this.username || !this.email || !this.password ||
        !this.anoSelecionado || !this.mesSelecionado || !this.diaSelecionado) {
      this.showAlert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dataNascimento = new Date(this.anoSelecionado, this.mesSelecionado - 1, this.diaSelecionado);
    const idade = this.calcularIdade(dataNascimento);

    if (idade < 18) {
      this.showAlert('Erro', 'Precisa de ter pelo menos 18 anos para criar uma conta.');
      return;
    }

    const existingUser = await this.criarAutentService.checkExistingUser(this.username);
    if (existingUser) {
      this.showAlert('Nome de utilizador já existe!', 'Por favor, escolha outro nome de utilizador.');
      return;
    }

    const dataNascimentoString = dataNascimento.toISOString().split('T')[0];

    // Create user object with all information
    const userData = {
      username: this.username,
      password: this.password,
      fullName: this.nome,
      email: this.email,
      morada: this.morada,
      dataNascimento: dataNascimentoString
    };

await this.criarAutentService.criarConta(userData);
    this.navCtrl.navigateRoot('/login');
}

  calcularIdade(data: Date): number { // Função que calcula idade a partir da data
    const hoje = new Date(); // Data atual
    let idade = hoje.getFullYear() - data.getFullYear(); // Diferença de anos
    const m = hoje.getMonth() - data.getMonth(); // Diferença de meses
    if (m < 0 || (m === 0 && hoje.getDate() < data.getDate())) { // Ajusta idade se ainda não fez anos este ano
      idade--;
    }
    return idade; // Retorna a idade calculada
  }

  async showAlert(header: string, message: string) { // Método para mostrar alertas
    const alert = await this.alertController.create({
      header, // Título do alerta
      message, // Mensagem do alerta
      buttons: ['OK'] // Botão OK para fechar
    });
    await alert.present(); // Apresenta o alerta
  }

  ngOnInit() { // Método executado na inicialização do componente
    const anoAtual = new Date().getFullYear(); // Ano atual
    for (let i = anoAtual; i >= 1900; i--) { // Preenche array de anos disponíveis do atual até 1900
      this.anosDisponiveis.push(i);
    }
  }

}
