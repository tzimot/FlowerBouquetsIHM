import { Component, OnInit } from '@angular/core';
import { FloresService, ImageData } from 'src/app/services/flores.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TopvendasService } from 'src/app/services/topvendas.service';

@Component({
  selector: 'app-top-vendas',
  templateUrl: './top-vendas.page.html',
  styleUrls: ['./top-vendas.page.scss'],
})
export class TopVendasPage implements OnInit {

  flowers: ImageData[] = []; // Guarda os dados das flores com quantidade
  totalSum: number = 0;      // Soma total dos preços das flores selecionadas

  constructor(
    private floresService: FloresService, 
    private router: Router, 
    private alertController: AlertController, 
    private topvendasService: TopvendasService
  ) { }

  ngOnInit() {
    // Busca as flores mais vendidas quando o componente inicia
    this.floresService.getTopVendas().subscribe(flowers => {
      // Inicializa a quantidade a 0 para cada flor
      this.flowers = flowers.map(flower => ({ ...flower, quantity: 0 }));
      this.calculateTotalSum(); // Calcula o total inicial
    });
  }

  // Calcula o valor total com base no preço e quantidade das flores
  calculateTotalSum() {
    this.totalSum = this.flowers.reduce((sum, flower) => sum + flower.price * flower.quantity, 0);
  }

  // Incrementa a quantidade da flor selecionada e atualiza o total
  incrementQuantity(flower: ImageData) {
    flower.quantity++;
    this.calculateTotalSum();
  }

  // Decrementa a quantidade se possível e atualiza o total
  decrementQuantity(flower: ImageData) {
    if (flower.quantity > 0) {
      flower.quantity--;
      this.calculateTotalSum();
    }
  }

  // Navega para a página seguinte apenas se a soma total for maior que 0, senão mostra alerta
  goToTopVendasUmPage() {
    if (this.totalSum === 0) {
      this.showAlert('Por favor, selecione algo para prosseguir.', '');
    } else {
      this.topvendasService.setPrecoValue(this.totalSum); // Guarda o preço total no serviço
      this.router.navigate(['/top-vendas-um']);
    }
  }

  // Mostra um alerta com cabeçalho e mensagem
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
