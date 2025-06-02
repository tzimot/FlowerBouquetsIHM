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
  selector: 'app-top-vendas',
  templateUrl: './top-vendas.page.html',
  styleUrls: ['./top-vendas.page.scss'],
})
export class TopVendasPage implements OnInit {

  public images: ImageData[] = [];
  public totalSum: number = 0;
  public filteredImages: ImageData[] = [];

  public categorias: { nome: string, ramos: ImageData[] }[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private preconeService: PrecoNEService
  ) {}

  ngOnInit() {
    fetch('./assets/imgsData/imagens.json')
      .then(res => res.json())
      .then(json => {
        this.images = json;
        this.filteredImages = this.images;
        this.calculateTotalSum();
        this.preconeService.setPrecoValue(this.totalSum);

        this.categorias = [
          {
            nome: 'Mais Vendidos',
            ramos: this.images.filter(img => [8, 5, 13].includes(img.id))
          },
          {
            nome: 'Melhores Preços',
            ramos: this.images.filter(img => [12, 4, 9].includes(img.id))
          },
          {
            nome: 'Últimos em Stock',
            ramos: this.images.filter(img => [6, 11, 14].includes(img.id))
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
    } else {
      image.quantity = 1;
    }
    this.calculateTotalSum();
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
      this.router.navigate(['/top-vendas-um']);
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
