// personalizar-ramo.page.ts
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
  selector: 'app-personalizar-ramo',
  templateUrl: './personalizar-ramo.page.html',
  styleUrls: ['./personalizar-ramo.page.scss'],
})
export class PersonalizarRamoPage implements OnInit {
  public images: ImageData[] = [];
  public totalSum: number = 0;
  public categorias: { nome: string, ramos: ImageData[] }[] = [];
  private originalCategorias: { nome: string, ramos: ImageData[] }[] = [];

  public showVaseSizeCard: boolean = false;
  public selectedVase: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private encomendaService: EncomendaService
  ) {}

  ngOnInit() {
    fetch('./assets/imgsData/imagens.json')
      .then(res => res.json())
      .then(json => {
        this.images = json;
        this.calculateTotalSum();

        this.categorias = [
          {
            nome: 'As nossas Flores',
            ramos: this.images.filter(img => [1, 2, 3].includes(img.id))
          },
          {
            nome: 'Os nossos Vasos',
            ramos: this.images.filter(img => [16, 17, 18].includes(img.id))
          }
        ];

        this.originalCategorias = JSON.parse(JSON.stringify(this.categorias));
      });
  }

  decreaseQuantity(image: ImageData) {
    if (image.quantity && image.quantity > 0) {
      image.quantity--;

      // Se for vaso e todos os vasos forem removidos, esconder o card de tamanho
      if (this.isVase(image)) {
        const vasosSelecionados = this.getSelectedVasesCount();
        if (vasosSelecionados === 0) {
          this.showVaseSizeCard = false;
          this.selectedVase = '';
        }
      }

      this.calculateTotalSum();
    }
  }

  increaseQuantity(image: ImageData) {
    image.quantity = (image.quantity || 0) + 1;

    // Mostrar o card de tamanho se for vaso
    if (this.isVase(image)) {
      this.showVaseSizeCard = true;
    }

    this.calculateTotalSum();
  }

  isVase(image: ImageData): boolean {
    // IDs dos vasos conforme JSON
    return [16, 17, 18].includes(image.id);
  }

  getSelectedVasesCount(): number {
    return this.images
      .filter(img => this.isVase(img))
      .reduce((sum, img) => sum + (img.quantity || 0), 0);
  }

  updateSelectedVase(value: string) {
    this.selectedVase = value;
    this.calculateTotalSum();
  }

  calculateTotalSum() {
    let total = this.images.reduce(
      (sum, image) => sum + (image.quantity || 0) * (image.price || 0),
      0
    );

    // Acrescentar preço do vaso com base no tamanho
    if (this.showVaseSizeCard) {
      switch (this.selectedVase) {
        case 'pequeno':
          total += 2;
          break;
        case 'medio':
          total += 4;
          break;
        case 'grande':
          total += 6;
          break;
      }
    }

    this.totalSum = total;
  }

  goToPersonalizarUmPage() {
    if (this.totalSum === 0) {
      this.showAlert('Por favor, selecione algo para prosseguir.', '');
    } else {
      this.router.navigate(['/personalizar-um']);
      this.encomendaService.setPendingTotal(this.totalSum);
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
    const searchQuery = event.target.value?.toLowerCase();

    if (!searchQuery || searchQuery.trim() === '') {
      this.categorias = JSON.parse(JSON.stringify(this.originalCategorias));
      return;
    }

    this.categorias = this.originalCategorias
      .map(categoria => {
        const ramosFiltrados = categoria.ramos.filter(ramo =>
          ramo.title.toLowerCase().includes(searchQuery) ||
          ramo.description.toLowerCase().includes(searchQuery)
        );
        return { ...categoria, ramos: ramosFiltrados };
      })
      .filter(categoria => categoria.ramos.length > 0);
  }
}
