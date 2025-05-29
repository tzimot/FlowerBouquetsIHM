import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PrecoNEService } from 'src/app/services/preco-ne.service';




@Component({
  selector: 'app-nova-encomenda-tres',
  templateUrl: './nova-encomenda-tres.page.html',
  styleUrls: ['./nova-encomenda-tres.page.scss'],
})
export class NovaEncomendaTresPage implements OnInit {

  metodoselecionado: string = '';
  precoValue: number = 0;

  constructor(private router: Router, private alertController: AlertController, private preconeService: PrecoNEService) { }

  ngOnInit() {
    this.precoValue = this.preconeService.getPrecoValue(); // Retrieve the stored price from the PrecoService
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
