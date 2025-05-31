import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController, AlertController } from '@ionic/angular';
import { CriarautentService } from 'src/app/services/criarautent.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {

  nome: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  morada?: string;

  // Novos campos para a data de nascimento
  anoSelecionado?: number;
  mesSelecionado?: number;
  diaSelecionado?: number;

  anosDisponiveis: number[] = [];
  meses: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  dias: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private criarAutentService: CriarautentService,
    private alertController: AlertController
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

    // Aqui podes salvar a data como string se quiseres
    const dataNascimentoString = dataNascimento.toISOString().split('T')[0];

    await this.criarAutentService.criarConta(this.username, this.password);

    this.navCtrl.navigateRoot('/login');
  }

  calcularIdade(data: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - data.getFullYear();
    const m = hoje.getMonth() - data.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < data.getDate())) {
      idade--;
    }
    return idade;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual; i >= 1900; i--) {
      this.anosDisponiveis.push(i);
    }
  }

}
