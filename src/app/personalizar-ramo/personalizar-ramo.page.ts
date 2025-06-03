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
  // Lista de imagens e total acumulado
  public images: ImageData[];
  public totalSum: number;
  filteredImages: ImageData[] = []; // Lista filtrada para pesquisa

  // Construtor com injeção de dependências
  constructor(
    private router: Router, 
    private alertController: AlertController, 
    private encomendaService: EncomendaService
  ) {
    this.images = [];        // Inicializa lista de imagens
    this.totalSum = 0;       // Inicializa o total a 0
  }

  // Função chamada ao iniciar o componente
  ngOnInit() {
    // Vai buscar os dados do ficheiro JSON
    fetch('./assets/imgsData/imagens.json')
      .then(res => res.json())         // Converte a resposta para JSON
      .then(json => {
        this.images = json;            // Guarda os dados no array de imagens
        this.calculateTotalSum();      // Calcula o total inicial
        this.filteredImages = this.images; // Inicializa a lista filtrada com todas as imagens
      });
  }

  // Diminui a quantidade de uma flor
  decreaseQuantity(image: ImageData) {
    if (image.quantity && image.quantity > 0) {
      image.quantity--;
      this.calculateTotalSum(); // Atualiza o total
    }
  }

  // Aumenta a quantidade de uma flor
  increaseQuantity(image: ImageData) {
    if (image.quantity) {
      image.quantity++;
      this.calculateTotalSum(); // Atualiza o total
    } else {
      image.quantity = 1;       // Se não tiver quantidade, define como 1
      this.calculateTotalSum();
    }
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
      this.router.navigate(['/personalizar-um']);     // Redireciona para a próxima página
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
    await alert.present(); // Apresenta o alerta
  }

  // Filtra as flores com base no texto da pesquisa
  searchFlowers(event: any) {
    const searchQuery = event.target.value;
    this.filteredImages = this.images.filter((image) =>
      image.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
