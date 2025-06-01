import { Component, OnInit } from '@angular/core'; // Importa o decorador Component e a interface OnInit
import { Router } from '@angular/router'; // Importa o Router para navegação
import { AlertController } from '@ionic/angular'; // Importa o controlador de alertas do Ionic
import { PrecoNEService } from 'src/app/services/preco-ne.service'; // Importa o serviço que guarda o preço da encomenda

@Component({
  selector: 'app-nova-encomenda-tres', // Seletor do componente
  templateUrl: './nova-encomenda-tres.page.html', // Caminho para o ficheiro HTML
  styleUrls: ['./nova-encomenda-tres.page.scss'], // Caminho para o ficheiro de estilos
})
export class NovaEncomendaTresPage implements OnInit {

  metodoselecionado: string = ''; // Armazena o método de pagamento selecionado
  precoValue: number = 0; // Armazena o valor do preço da encomenda


  constructor(private router: Router, private alertController: AlertController, private preconeService: PrecoNEService) { } // Injeta Router, AlertController e o serviço de preço

  ngOnInit() {
    this.precoValue = this.preconeService.getPrecoValue(); // Recupera o preço guardado no serviço
  }

  handlePaymentSelection() {
    console.log(this.metodoselecionado); // Mostra no console o método selecionado (debug)
  }

  goToCancelarPage() {
    this.router.navigate(['/cancelar']); // Navega para a página de cancelamento
  }

  confirmarPagamento() {
    if (!this.metodoselecionado) { // Verifica se nenhum método foi selecionado
      this.showAlert('Por Favor, selecione um método de Pagamento!', ''); // Mostra alerta se não estiver selecionado
    } else {
      this.goToObrigadoPage(); // Caso contrário, navega para a página de confirmação
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({ // Cria um alerta com o título e mensagem
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present(); // Mostra o alerta
  }

  goToObrigadoPage() {
    this.router.navigate(['/obrigado']); // Navega para a página "obrigado"
  }

}
