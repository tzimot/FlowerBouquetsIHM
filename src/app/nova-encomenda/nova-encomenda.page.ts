import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PrecoNEService } from 'src/app/services/preco-ne.service';

interface ImageData {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
}

@Component({
  selector: 'app-nova-encomenda',
  templateUrl: './nova-encomenda.page.html',
  styleUrls: ['./nova-encomenda.page.scss'],
})
export class NovaEncomendaPage implements OnInit {

  public images: ImageData[];
  public totalSum: number;
  filteredImages: ImageData[] = [];

  public categorias: { nome: string, ramos: ImageData[] }[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private preconeService: PrecoNEService
  ) {
    this.images = [];
    this.totalSum = 0;
  }

  ngOnInit() {
    fetch('./assets/imgsData/imagens.json')
      .then(res => res.json())
      .then(json => {
        this.images = json;
        this.calculateTotalSum();
        this.preconeService.setPrecoValue(this.totalSum);
        this.filteredImages = this.images;

        this.categorias = [
          {
            nome: 'Bouquets de Noiva',
            ramos: this.images.filter(img => [4, 5, 6].includes(img.id))
          },
          {
            nome: 'Dia dos Namorados',
            ramos: this.images.filter(img => [7, 8, 9].includes(img.id))
          },
          {
            nome: 'Decoração de Casa',
            ramos: this.images.filter(img => [10, 11, 12].includes(img.id))
          }
        ];
      });
  }

  decreaseQuantity(image: ImageData) {
    if (image.quantity && image.quantity > 0) {
      image.quantity--;
      this.calculateTotalSum();
    }
  }

  increaseQuantity(image: ImageData) {
    if (image.quantity) {
      image.quantity++;
      this.calculateTotalSum();
    } else {
      image.quantity = 1;
      this.calculateTotalSum();
    }
  }

  calculateTotalSum() {
    this.totalSum = this.images.reduce(
      (sum, image) => sum + (image.quantity || 0) * (image.price || 0),
      0
    );
  }

  goToNovaEncomendaUmPage() {
    if (this.totalSum === 0) {
      this.showAlert('Por favor, selecione algo para prosseguir.', '');
    } else {
      this.calculateTotalSum();
      this.preconeService.setPrecoValue(this.totalSum);
      this.router.navigate(['/nova-encomenda-um']);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  searchFlowers(event: any) {
    const searchQuery = event.target.value;
    this.filteredImages = this.images.filter((image) =>
      image.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
