import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PrecoNEService } from 'src/app/services/preco-ne.service'; // caso uses este serviço como no outro exemplo

@Component({
  selector: 'app-personalizar-tres',
  templateUrl: './personalizar-tres.page.html',
  styleUrls: ['./personalizar-tres.page.scss'],
})
export class PersonalizarTresPage implements OnInit {

  precoValue: number = 0;
  metodoselecionado: string = '';
  mbwayNumero: string = '';
  cartaoNumero: string = '';
  cartaoValidade: string = '';
  cartaoCVV: string = '';
  cartaoNome: string = '';
  desejaFatura: boolean = false;

  dadosFatura = {
    nome: '',
    nif: '',
    localidade: '',
    email: ''
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private precoService: PrecoNEService // opcional — remove se não fores usar
  ) {}

  ngOnInit() {
    this.precoValue = this.precoService.getPrecoValue(); // remove se não estiveres a usar o PrecoService
  }

  selecionarMetodo(metodo: string) {
    this.metodoselecionado = metodo;
  }

  confirmarPagamento() {
    if (!this.metodoselecionado) {
      this.showAlert('Por Favor, selecione um método de Pagamento!', '');
    } else {
      this.goToObrigadoPage();
    }
  }

  goToCancelarPage() {
    this.router.navigate(['/cancelar']);
  }

  goToObrigadoPage() {
    this.router.navigate(['/obrigado']);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
