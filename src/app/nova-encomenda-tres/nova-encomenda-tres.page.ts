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

  precoTotal: number = 0; // Valor total a pagar
  metodoselecionado: string = ''; // Método de pagamento escolhido
  mbwayNumero: string = ''; // Número MBWay (caso aplicável)
  cartaoNumero: string = ''; // Número do cartão (caso aplicável)
  cartaoValidade: string = ''; // Validade do cartão
  cartaoCVV: string = ''; // Código de segurança do cartão
  cartaoNome: string = ''; // Nome do titular do cartão
  desejaFatura: boolean = false; // Indica se o utilizador quer fatura
  usarPontos: boolean = false; // Indica se o utilizador quer usar pontos
  pontosDisponiveis: number = 0; // Pontos disponíveis do utilizador
  descontoPontos: number = 0; // Pontos usados como desconto
  originalTotal: number = 0; // Valor total original antes de descontos

  // Dados para a fatura
  dadosFatura = {
    nome: '',
    nif: '',
    localidade: '',
    email: ''
  };

  constructor(
    private router: Router, // Para navegação entre páginas
    private alertController: AlertController, // Para mostrar alertas
    private encomendaService: EncomendaService // Serviço para gerir encomendas
  ) {}

  ngOnInit() {
    // Inicializa os valores totais e pontos disponíveis ao carregar a página
    this.originalTotal = this.encomendaService.getPendingTotal();
    this.precoTotal = this.encomendaService.getPendingTotal();
    this.pontosDisponiveis = this.encomendaService.getPontos();
  }

  // Seleciona o método de pagamento
  selecionarMetodo(metodo: string) {
    this.metodoselecionado = metodo;
  }

  // Confirma o pagamento e processa a encomenda
  async confirmarPagamento() {
    // Adiciona a compra ao histórico
    this.encomendaService.adicionarCompraAoHistorico(
      this.precoTotal, 
      'Os Nossos Ramos', 
      `Compra realizada via ${this.metodoselecionado}`
    );
    // Verifica se foi selecionado um método de pagamento
    if (!this.metodoselecionado) {
      this.showAlert('Por Favor, selecione um método de Pagamento!', '');
    } else {
      // Deduz pontos se o utilizador os usar
      if (this.usarPontos && this.descontoPontos > 0) {
        this.encomendaService.addPontos(-this.descontoPontos);
      }
      // Atualiza o total da encomenda
      this.encomendaService.setTotal(this.precoTotal);
      // Navega para a página de agradecimento
      this.goToObrigadoPage();
      // Emite evento para resetar quantidades
      this.encomendaService.emitResetQuantities();
    }
  }

  // Navega para a página de cancelamento
  goToCancelarPage() {
    this.router.navigate(['/cancelar']);
  }

  // Navega para a página de agradecimento
  goToObrigadoPage() {
    this.router.navigate(['/obrigado']);
  }

  // Mostra um alerta ao utilizador
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Aplica desconto dos pontos ao valor total
  aplicarDescontoPontos() {
    if (this.usarPontos && this.pontosDisponiveis > 0) {
      // Só usa pontos inteiros e até ao valor inteiro do total original
      const pontosParaUsar = Math.min(this.pontosDisponiveis, Math.floor(this.originalTotal));
      this.descontoPontos = pontosParaUsar;
      this.precoTotal = this.originalTotal - this.descontoPontos;
      // Garante que o preço não fica negativo
      if (this.precoTotal < 0) this.precoTotal = 0;
    } else {
      // Se não usar pontos, mantém o valor original
      this.descontoPontos = 0;
      this.precoTotal = this.originalTotal;
    }
  }
}