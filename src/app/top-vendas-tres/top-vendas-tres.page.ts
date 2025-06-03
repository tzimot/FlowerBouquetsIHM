import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EncomendaService } from '../services/encomenda.service'; 


@Component({
  selector: 'app-top-vendas-tres',
  templateUrl: './top-vendas-tres.page.html',
  styleUrls: ['./top-vendas-tres.page.scss'],
})
export class TopVendasTresPage implements OnInit {

  precoTotal: number = 0;
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
    private encomendaService:  EncomendaService 
  ) {}

  ngOnInit() {
    this.precoTotal = this.encomendaService.getTotal();
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
