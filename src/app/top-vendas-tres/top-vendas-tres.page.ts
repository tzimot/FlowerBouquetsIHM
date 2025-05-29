import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TopvendasService } from 'src/app/services/topvendas.service';





@Component({
  selector: 'app-top-vendas-tres',
  templateUrl: './top-vendas-tres.page.html',
  styleUrls: ['./top-vendas-tres.page.scss'],
})
export class TopVendasTresPage implements OnInit {

  metodoselecionado: string = '';
  precoValue: number = 0;

  constructor(private router: Router, private alertController: AlertController, private topvendasService: TopvendasService) { }

  ngOnInit() {
    const precoValue = this.topvendasService.getPrecoValue();
    console.log(precoValue); // Use the price value as needed
  }

  handlePaymentSelection() {
    console.log(this.metodoselecionado);
  }

  goToCancelarPage() {
    this.router.navigate(['/cancelar']);
  }


  confirmarPagamento() {
    if (!this.metodoselecionado) {
      this.showAlert('Por Favor, selecione um método de Pagamento!', '');
    } else {
      // Proceed with the payment
      // Redirect to obrigado page or perform other actions
      this.goToObrigadoPage();
    }
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToObrigadoPage() {
      this.router.navigate(['/obrigado']);
    }

}
