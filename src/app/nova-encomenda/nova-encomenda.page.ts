import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EncomendaService } from '../services/encomenda.service'; 

// Interface para os dados de cada imagem/flor
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

  public images: ImageData[]; // Lista de todas as flores disponíveis
  public totalSum: number; // Soma total do valor das flores selecionadas
  filteredImages: ImageData[] = []; // Lista filtrada de flores (não usada diretamente no template)
  public categorias: { nome: string, ramos: ImageData[] }[] = []; // Categorias de flores para apresentação

  constructor(
    private router: Router, // Para navegação entre páginas
    private alertController: AlertController, // Para mostrar alertas ao utilizador
    private encomendaService: EncomendaService // Serviço para partilhar dados entre componentes
  ) {
    this.images = [];
    this.totalSum = 0;
  }

  ngOnInit() {
    // Carrega os dados das flores a partir de um ficheiro JSON local
    fetch('./assets/imgsData/imagens.json')
      .then(res => res.json())
      .then(json => {
        this.images = json; // Guarda as flores carregadas
        this.calculateTotalSum(); // Calcula o total inicial (deve ser 0)
        this.resetQuantities(); // Garante que todas as quantidades começam a 0
        this.filteredImages = this.images; // Inicializa a lista filtrada

        // Define as categorias e associa os ramos correspondentes por id
        this.categorias = [
          {
            nome: 'Ramos de Noiva',
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
    // Subscreve ao evento de reset das quantidades vindo do serviço
    this.encomendaService.resetQuantities$.subscribe(() => {
      this.resetQuantities();
    });
  }

  // Repõe todas as quantidades das flores a 0 e recalcula o total
  resetQuantities() {
    this.images.forEach(image => image.quantity = 0);
    this.calculateTotalSum();
  }

  // Diminui a quantidade de uma flor, se for maior que 0
  decreaseQuantity(image: ImageData) {
    if (image.quantity && image.quantity > 0) {
      image.quantity--;
      this.calculateTotalSum();
    }
  }

  // Aumenta a quantidade de uma flor (inicializa a 1 se undefined)
  increaseQuantity(image: ImageData) {
    if (image.quantity) {
      image.quantity++;
      this.calculateTotalSum();
    } else {
      image.quantity = 1;
      this.calculateTotalSum();
    }
  }

  // Calcula o valor total da encomenda com base nas quantidades e preços
  calculateTotalSum() {
    this.totalSum = this.images.reduce(
      (sum, image) => sum + (image.quantity || 0) * (image.price || 0),
      0
    );
  }

  // Avança para a próxima página da encomenda, se houver flores selecionadas
  goToNovaEncomendaUmPage() {
    if (this.totalSum === 0) {
      this.showAlert('Por favor, selecione algo para prosseguir.', '');
    } else {
      this.router.navigate(['/nova-encomenda-um']);
      this.encomendaService.setPendingTotal(this.totalSum); // Guarda o total no serviço
    }
  }

  // Mostra um alerta ao utilizador com o cabeçalho e mensagem dados
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Filtra as flores nas categorias com base no texto de pesquisa do utilizador
  searchFlowers(event: any) {
    const searchQuery = event.target.value?.toLowerCase();
  
    if (!searchQuery || searchQuery.trim() === '') {
      this.ngOnInit(); // Se a pesquisa estiver vazia, repõe as categorias originais
      return;
    }
  
    // Filtra os ramos de cada categoria pelo título ou descrição
    this.categorias = this.categorias
      .map(categoria => {
        const filteredRamos = categoria.ramos.filter(ramo =>
          ramo.title.toLowerCase().includes(searchQuery) ||
          ramo.description.toLowerCase().includes(searchQuery)
        );
        return { ...categoria, ramos: filteredRamos };
      })
      .filter(categoria => categoria.ramos.length > 0); // Só mantém categorias com resultados
  }
  
}
