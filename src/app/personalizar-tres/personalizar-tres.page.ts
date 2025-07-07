import { Component, OnInit } from '@angular/core'; // Importa módulos necessários do Angular
import { Router } from '@angular/router'; // Para navegação entre páginas
import { AlertController } from '@ionic/angular'; // Para mostrar alertas
import { EncomendaService } from '../services/encomenda.service'; // Serviço para gerir encomendas

@Component({
  selector: 'app-personalizar-tres',
  templateUrl: './personalizar-tres.page.html',
  styleUrls: ['./personalizar-tres.page.scss'],
})
export class PersonalizarTresPage implements OnInit {

  precoTotal: number = 0; // Valor total a pagar
  metodoselecionado: string = ''; // Método de pagamento escolhido
  mbwayNumero: string = ''; // Número MBWay (caso aplicável)
  cartaoNumero: string = ''; // Número do cartão de crédito
  cartaoValidade: string = ''; // Validade do cartão
  cartaoCVV: string = ''; // Código de segurança do cartão
  cartaoNome: string = ''; // Nome no cartão
  desejaFatura: boolean = false; // Se o utilizador quer fatura
  usarPontos: boolean = false; // Se o utilizador quer usar pontos
  pontosDisponiveis: number = 0; // Pontos disponíveis do utilizador
  descontoPontos: number = 0; // Pontos usados como desconto
  originalTotal: number = 0; // Total original antes de descontos

  dadosFatura = { // Dados para a fatura
    nome: '',
    nif: '',
    localidade: '',
    email: ''
  };

  constructor(
    private router: Router, // Injeta o serviço de navegação
    private alertController: AlertController, // Injeta o serviço de alertas
    private encomendaService: EncomendaService // Injeta o serviço de encomendas
  ) {}

  ngOnInit() {
    // Inicializa os valores ao carregar a página
    this.originalTotal = this.encomendaService.getPendingTotal();
    this.precoTotal = this.encomendaService.getPendingTotal();
    this.pontosDisponiveis = this.encomendaService.getPontos();
  }

  selecionarMetodo(metodo: string) {
    // Guarda o método de pagamento escolhido
    this.metodoselecionado = metodo;
  }

  async confirmarPagamento() {
    // Adiciona a compra ao histórico
    this.encomendaService.adicionarCompraAoHistorico(
      this.precoTotal, 
      'Personalizar Ramo', 
      `Compra realizada via ${this.metodoselecionado}`
    );
    if (!this.metodoselecionado) {
      // Alerta se não foi selecionado método de pagamento
      this.showAlert('Por Favor, selecione um método de Pagamento!', '');
    } else {
      // Se usar pontos, desconta-os
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

  goToCancelarPage() {
    // Navega para a página de cancelamento
    this.router.navigate(['/cancelar']);
  }

  goToObrigadoPage() {
    // Navega para a página de agradecimento
    this.router.navigate(['/obrigado']);
  }

  async showAlert(header: string, message: string) {
    // Mostra um alerta ao utilizador
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  aplicarDescontoPontos() {
    // Aplica desconto se o utilizador quiser usar pontos
    if (this.usarPontos && this.pontosDisponiveis > 0) {
      // Só usa pontos inteiros e até ao valor inteiro do total original
      const pontosParaUsar = Math.min(this.pontosDisponiveis, Math.floor(this.originalTotal));
      this.descontoPontos = pontosParaUsar;
      this.precoTotal = this.originalTotal - this.descontoPontos;
      // Garante que o preço não fica negativo
      if (this.precoTotal < 0) this.precoTotal = 0;
    } else {
      // Se não usar pontos, mantém o total original
      this.descontoPontos = 0;
      this.precoTotal = this.originalTotal;
    }
  }
}
