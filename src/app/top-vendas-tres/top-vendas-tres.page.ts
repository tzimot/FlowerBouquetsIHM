import { Component, OnInit } from '@angular/core'; // Importa Component e OnInit do Angular
import { Router } from '@angular/router'; // Importa Router para navegação entre páginas
import { AlertController } from '@ionic/angular'; // Importa controlador para alertas do Ionic
import { TopvendasService } from 'src/app/services/topvendas.service'; // Importa o serviço Topvendas para partilha de dados

@Component({
  selector: 'app-top-vendas-tres', // Define o seletor do componente no HTML
  templateUrl: './top-vendas-tres.page.html', // Define o ficheiro HTML do componente
  styleUrls: ['./top-vendas-tres.page.scss'], // Define o ficheiro de estilos do componente
})
export class TopVendasTresPage implements OnInit { // Declara a classe do componente que implementa OnInit

  metodoselecionado: string = ''; // Variável para guardar o método de pagamento selecionado, inicializada vazia
  precoValue: number = 0; // Variável para guardar o valor do preço, inicializada a zero

  constructor(private router: Router, private alertController: AlertController, private topvendasService: TopvendasService) { } 
  // Injeção de dependências: Router, AlertController e o serviço Topvendas

  ngOnInit() { // Método executado quando o componente é inicializado
    const precoValue = this.topvendasService.getPrecoValue(); // Obtém o preço armazenado no serviço
    console.log(precoValue); // Mostra o preço na consola para debug
  }

  handlePaymentSelection() { // Método chamado quando um método de pagamento é selecionado
    console.log(this.metodoselecionado); // Mostra na consola o método selecionado
  }

  goToCancelarPage() { // Método para navegar para a página de cancelamento
    this.router.navigate(['/cancelar']); // Navega para a rota '/cancelar'
  }

  confirmarPagamento() { // Método que confirma o pagamento
    if (!this.metodoselecionado) { // Se não foi selecionado nenhum método
      this.showAlert('Por Favor, selecione um método de Pagamento!', ''); // Mostra alerta a pedir seleção
    } else {
      // Se o método foi selecionado
      this.goToObrigadoPage(); // Navega para a página de agradecimento
    }
  }

  async showAlert(header: string, message: string) { // Método assíncrono para mostrar alertas
    const alert = await this.alertController.create({ // Cria o alerta
      header, // Cabeçalho do alerta
      message, // Mensagem do alerta
      buttons: ['OK'], // Botão para fechar o alerta
    });
    await alert.present(); // Apresenta o alerta ao utilizador
  }

  goToObrigadoPage() { // Método para navegar para a página de agradecimento
    this.router.navigate(['/obrigado']); // Navega para a rota '/obrigado'
  }

}
