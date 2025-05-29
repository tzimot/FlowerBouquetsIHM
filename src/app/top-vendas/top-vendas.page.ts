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

  constructor(private floresService: FloresService, private router: Router, private alertController: AlertController, private topvendasService: TopvendasService) { }

  flowers: ImageData[] = [];
  totalSum: number = 0;

  ngOnInit() {
    this.floresService.getTopVendas().subscribe(flowers => {
      this.flowers = flowers.map(flower => ({ ...flower, quantity: 0 }));
      this.calculateTotalSum();
    });
  }


  calculateTotalSum() {
    this.totalSum = this.flowers.reduce((sum, flower) => sum + flower.price * flower.quantity, 0);
  }


  incrementQuantity(flower: ImageData) {
    flower.quantity++;
    this.calculateTotalSum();
  }


  decrementQuantity(flower: ImageData) {
    if (flower.quantity > 0) {
      flower.quantity--;
      this.calculateTotalSum();
    }
  }


  goToTopVendasUmPage() {
    if (this.totalSum === 0) {
      this.showAlert('Por favor, selecione algo para prosseguir.', '');
    } else {
      this.topvendasService.setPrecoValue(this.totalSum); // Set the calculated price in the TopvendasService
      this.router.navigate(['/top-vendas-um']);
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

}
