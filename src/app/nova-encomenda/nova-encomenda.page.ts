import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EncomendaService } from '../services/encomenda.service'; 

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
    private encomendaService: EncomendaService
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
        this.filteredImages = this.images;

        this.categorias = [
          {
            nome: 'Bouquets de Noiva',
            ramos: this.images.filter(img => [13, 14, 15].includes(img.id))
          },
          {
            nome: 'Dia dos Namorados',
            ramos: this.images.filter(img => [4, 8, 9].includes(img.id))
          },
          {
            nome: 'Decoração de Casa',
            ramos: this.images.filter(img => [7, 5, 6].includes(img.id))
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
      this.router.navigate(['/nova-encomenda-um']);
      this.encomendaService.setPendingTotal(this.totalSum); // <-- Set pending total
    }
  }

  // Exibe um alerta com o cabeçalho e mensagem fornecidos
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Filtra as flores com base no texto de pesquisa inserido pelo utilizador
  searchFlowers(event: any) {
    const searchQuery = event.target.value?.toLowerCase();
  
    if (!searchQuery || searchQuery.trim() === '') {
      // Reset to full categories
      this.ngOnInit(); // Or keep a backup copy of original categorias if you prefer
      return;
    }
  
    this.categorias = this.categorias
      .map(categoria => {
        const filteredRamos = categoria.ramos.filter(ramo =>
          ramo.title.toLowerCase().includes(searchQuery) ||
          ramo.description.toLowerCase().includes(searchQuery)
        );
        return { ...categoria, ramos: filteredRamos };
      })
      .filter(categoria => categoria.ramos.length > 0);
  }
  
}
