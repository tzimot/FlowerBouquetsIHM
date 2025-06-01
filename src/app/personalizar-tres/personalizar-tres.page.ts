import { Component, OnInit } from '@angular/core'; // Importa funcionalidades básicas para componente e ciclo de vida
import { Router } from '@angular/router'; // Importa serviço para navegação entre páginas
import { AlertController } from '@ionic/angular'; // Importa controlador para criar alertas no Ionic
import { PrecoService } from 'src/app/services/preco.service'; // Importa serviço para gerir o preço

@Component({
  selector: 'app-personalizar-tres', // Define o seletor do componente
  templateUrl: './personalizar-tres.page.html', // Aponta para o ficheiro HTML do componente
  styleUrls: ['./personalizar-tres.page.scss'], // Aponta para o ficheiro de estilos do componente
})
export class PersonalizarTresPage implements OnInit {

  metodoselecionado: string = ''; // Guarda o método de pagamento selecionado
  precoValue: number = 0; // Guarda o valor do preço atual

  constructor(
    private router: Router, // Injeta o serviço de navegação
    private alertController: AlertController, // Injeta o serviço para alertas
    private precoService: PrecoService // Injeta o serviço para preço
  ) { }

  ngOnInit() {
    this.precoValue = this.precoService.getPrecoValue(); 
    // Ao iniciar, obtém o preço guardado no serviço PrecoService
  }

  handlePaymentSelection() {
    console.log(this.metodoselecionado);
    // Mostra no console o método de pagamento selecionado (para debug)
  }

  goToCancelarPage() {
    this.router.navigate(['/cancelar']); 
    // Navega para a página de cancelamento
  }

  confirmarPagamento() {
    if (!this.metodoselecionado) {
      this.showAlert('Por Favor, selecione um método de Pagamento!', ''); 
      // Se não foi selecionado método, mostra alerta a avisar o utilizador
    } else {
      // Se método selecionado, segue com o processo de pagamento
      this.goToObrigadoPage(); // Navega para página de obrigado
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header, // Cabeçalho do alerta
      message, // Mensagem do alerta
      buttons: ['OK'], // Botão para fechar o alerta
    });
    await alert.present(); // Mostra o alerta no ecrã
  }

  goToObrigadoPage() {
    this.router.navigate(['/obrigado']); 
    // Navega para a página de obrigado após confirmação
  }
}
