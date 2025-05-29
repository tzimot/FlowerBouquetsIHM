import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PrecoService } from 'src/app/services/preco.service';




@Component({
  selector: 'app-personalizar-tres',
  templateUrl: './personalizar-tres.page.html',
  styleUrls: ['./personalizar-tres.page.scss'],
})
export class PersonalizarTresPage implements OnInit {

  metodoselecionado: string = '';
  precoValue: number = 0;

  constructor(private router: Router, private alertController: AlertController, private precoService: PrecoService) { }

  ngOnInit() {
    this.precoValue = this.precoService.getPrecoValue(); // Retrieve the stored price from the PrecoService
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
