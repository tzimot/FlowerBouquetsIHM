// Importa os módulos necessários de Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EncomendaService } from '../services/encomenda.service'; 

// Define a interface do tipo dos dados das imagens
interface ImageData {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
}

// Define o componente com o seu seletor, ficheiro HTML e CSS
@Component({
  selector: 'app-personalizar-ramo',
  templateUrl: './personalizar-ramo.page.html',
  styleUrls: ['./personalizar-ramo.page.scss'],
})
export class PersonalizarRamoPage implements OnInit {
  public images: ImageData[];           // Lista de imagens
  public filteredImages: ImageData[] = []; // Lista filtrada para pesquisa
  public totalSum: number;              // Total acumulado
  private originalImages: ImageData[];  // Cópia original para reset de pesquisa

  // Construtor com injeção de dependências
  constructor(
    private router: Router, 
    private alertController: AlertController, 
    private encomendaService: EncomendaService
  ) {
    this.images = [];        
    this.totalSum = 0;       
    this.originalImages = [];
  }

  // Função chamada ao iniciar o componente
  ngOnInit() {
    fetch('./assets/imgsData/imagens.json')
      .then(res => res.json())
      .then(json => {
        // Only use specific images for this page (e.g., ID 1, 2, 3)
        const selectedIds = [1, 2, 3]; // Change these as needed
        this.images = json.filter((img: ImageData) => selectedIds.includes(img.id));
        this.originalImages = [...this.images];
        this.filteredImages = this.images; // Show all selected initially
        this.calculateTotalSum();
      });
  }
  

  // Diminui a quantidade de uma flor
  decreaseQuantity(image: ImageData) {
    if (image.quantity && image.quantity > 0) {
      image.quantity--;
      this.calculateTotalSum(); 
    }
  }

  // Aumenta a quantidade de uma flor
  increaseQuantity(image: ImageData) {
    if (image.quantity) {
      image.quantity++;
    } else {
      image.quantity = 1;       
    }
    this.calculateTotalSum();
  }

  // Calcula o total da encomenda
  calculateTotalSum() {
    this.totalSum = this.images.reduce(
      (sum, image) => sum + (image.quantity || 0) * (image.price || 0),
      0
    );
  }

  // Vai para a página seguinte (Personalizar Um), se houver itens selecionados
  goToPersonalizarUmPage() {
    if (this.totalSum === 0) {
      this.showAlert('Por favor, selecione algo para prosseguir.', '');
    } else {
      this.router.navigate(['/personalizar-um']);     
      this.encomendaService.setTotal(this.totalSum);
    }
  }

  // Mostra um alerta com mensagem e título
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present(); 
  }

  // Filtra as flores com base no texto da pesquisa
  searchFlowers(event: any) {
    const query = event.target.value?.toLowerCase();
  
    if (!query || query.trim() === '') {
      this.filteredImages = [...this.originalImages];
    } else {
      this.filteredImages = this.originalImages.filter(image =>
        image.title.toLowerCase().includes(query) ||
        image.description.toLowerCase().includes(query)
      );
    }
  }
  
}
