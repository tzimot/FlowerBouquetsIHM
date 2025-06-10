import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EncomendaService } from '../services/encomenda.service'; 

@Component({
  selector: 'app-nova-encomenda-tres',
  templateUrl: './nova-encomenda-tres.page.html',
  styleUrls: ['./nova-encomenda-tres.page.scss'],
})
export class NovaEncomendaTresPage implements OnInit {

  precoTotal: number = 0;
  metodoselecionado: string = '';
  mbwayNumero: string = '';
  cartaoNumero: string = '';
  cartaoValidade: string = '';
  cartaoCVV: string = '';
  cartaoNome: string = '';
  desejaFatura: boolean = false;
  usarPontos: boolean = false;
  pontosDisponiveis: number = 0;
  descontoPontos: number = 0;
  originalTotal: number = 0;

  dadosFatura = {
    nome: '',
    nif: '',
    localidade: '',
    email: ''
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private encomendaService: EncomendaService
  ) {}

  ngOnInit() {
    this.originalTotal = this.encomendaService.getPendingTotal();
    this.precoTotal = this.encomendaService.getPendingTotal();
    this.pontosDisponiveis = this.encomendaService.getPontos();
  }

  selecionarMetodo(metodo: string) {
    this.metodoselecionado = metodo;
  }

  async confirmarPagamento() {
    this.encomendaService.adicionarCompraAoHistorico(
      this.precoTotal, 
      'Os Nossos Ramos', 
      `Compra realizada via ${this.metodoselecionado}`
    );
    if (!this.metodoselecionado) {
      this.showAlert('Por Favor, selecione um método de Pagamento!', '');
    } else {
    // Deduct points if used
    if (this.usarPontos && this.descontoPontos > 0) {
      this.encomendaService.addPontos(-this.descontoPontos);
    }
    // Reset points if not using them
    this.encomendaService.setTotal(this.precoTotal);
    this.goToObrigadoPage();
    this.encomendaService.emitResetQuantities();
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

  aplicarDescontoPontos() {
    if (this.usarPontos && this.pontosDisponiveis > 0) {
      // Only use integer points, and only for the integer part of the original total
      const pontosParaUsar = Math.min(this.pontosDisponiveis, Math.floor(this.originalTotal));
      this.descontoPontos = pontosParaUsar;
      this.precoTotal = this.originalTotal - this.descontoPontos;
      // Ensure no negative price
      if (this.precoTotal < 0) this.precoTotal = 0;
    } else {
      this.descontoPontos = 0;
      this.precoTotal = this.originalTotal;
    }
  }
}