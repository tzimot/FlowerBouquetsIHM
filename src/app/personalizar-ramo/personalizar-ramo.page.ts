import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EncomendaService } from '../services/encomenda.service';

// Interface para os dados das imagens (flores/vasos)
interface ImageData {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  quantity?: number; // quantidade selecionada
  quantityBySize?: { [size: string]: number }; // quantidade por tamanho (para vasos)
}

@Component({
  selector: 'app-personalizar-ramo',
  templateUrl: './personalizar-ramo.page.html',
  styleUrls: ['./personalizar-ramo.page.scss'],
})
export class PersonalizarRamoPage implements OnInit {
  public images: ImageData[] = []; // Todas as imagens carregadas
  public totalSum = 0; // Soma total do valor selecionado
  public categorias: { nome: string, ramos: ImageData[] }[] = []; // Categorias visíveis (flores/vasos)
  private originalCategorias: { nome: string, ramos: ImageData[] }[] = []; // Backup das categorias originais
  public showVaseSizeCard = false; // Controla exibição do card de tamanho do vaso
  public selectedVase: ImageData | null = null; // Vaso selecionado para escolher tamanho
  public selectedVaseSize: string | null = null; // Tamanho selecionado do vaso

  constructor(
    private router: Router,
    private alertController: AlertController,
    private encomendaService: EncomendaService
  ) {}

  ngOnInit() {
    // Carrega os dados das imagens do ficheiro JSON
    fetch('./assets/imgsData/imagens.json')
      .then(res => res.json())
      .then(json => {
        this.images = json; // Guarda as imagens
        this.calculateTotalSum(); // Calcula o total inicial
        this.resetQuantities(); // Reseta as quantidades
        // Define as categorias (flores e vasos) com base nos IDs
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
        // Guarda uma cópia das categorias originais para pesquisa
        this.originalCategorias = JSON.parse(JSON.stringify(this.categorias));
      });
    // Subscreve ao evento de reset das quantidades
    this.encomendaService.resetQuantities$.subscribe(() => {
      this.resetQuantities();
    });
  }

  // Reseta as quantidades de todas as imagens
  resetQuantities() {
    this.images.forEach(image => {
      image.quantity = 0; // Reseta quantidade
      if (this.isVase(image)) {
        image.quantityBySize = {}; // Reseta quantidades por tamanho para vasos
      }
    });
    this.selectedVase = null; // Limpa vaso selecionado
    this.selectedVaseSize = null; // Limpa tamanho selecionado
    this.showVaseSizeCard = false; // Esconde card de tamanho
    this.calculateTotalSum(); // Atualiza total
  }

  // Diminui a quantidade de uma imagem (ou abre seleção de tamanho para vasos)
  decreaseQuantity(image: ImageData) {
    if (this.isVase(image)) {
      this.showVaseSizeCard = true; // Mostra card de tamanho
      this.selectedVase = image; // Define vaso selecionado
      this.selectedVaseSize = null; // Limpa tamanho selecionado
      return;
    }

    if (image.quantity && image.quantity > 0) {
      image.quantity--; // Diminui quantidade
      this.calculateTotalSum(); // Atualiza total
    }
  }

  // Aumenta a quantidade de uma imagem (ou abre seleção de tamanho para vasos)
  increaseQuantity(image: ImageData) {
    if (this.isVase(image)) {
      this.showVaseSizeCard = true; // Mostra card de tamanho
      this.selectedVase = image; // Define vaso selecionado
      this.selectedVaseSize = null; // Limpa tamanho selecionado
      return;
    }
    image.quantity = (image.quantity || 0) + 1; // Aumenta quantidade
    this.calculateTotalSum(); // Atualiza total
  }

  // Verifica se a imagem é um vaso (pelo ID)
  isVase(image: ImageData): boolean {
    return [16, 17, 18].includes(image.id);
  }

  // Conta o total de vasos selecionados (somando todos os tamanhos)
  getSelectedVasesCount(): number {
    return this.images
      .filter(img => this.isVase(img))
      .reduce((sum, img) => {
        if (img.quantityBySize) {
          return sum + Object.values(img.quantityBySize).reduce((a, b) => a + b, 0);
        }
        return sum;
      }, 0);
  }

  // Confirma o tamanho do vaso selecionado e incrementa a quantidade desse tamanho
  confirmVaseSize() {
    if (this.selectedVase && this.selectedVaseSize) {
      if (!this.selectedVase.quantityBySize) {
        this.selectedVase.quantityBySize = {};
      }
      if (!this.selectedVase.quantityBySize[this.selectedVaseSize]) {
        this.selectedVase.quantityBySize[this.selectedVaseSize] = 0;
      }
      this.selectedVase.quantityBySize[this.selectedVaseSize]++; // Incrementa quantidade do tamanho escolhido
      // Atualiza quantidade total do vaso (soma de todos os tamanhos)
      this.selectedVase.quantity = Object.values(this.selectedVase.quantityBySize).reduce((a, b) => a + b, 0);
      this.showVaseSizeCard = false; // Esconde card de tamanho
      this.selectedVase = null; // Limpa seleção
      this.selectedVaseSize = null;
      this.calculateTotalSum(); // Atualiza total
    }
  }

// Calcula o valor total da seleção (flores e vasos)
calculateTotalSum() {
  let total = 0;

  this.images.forEach(image => {
    if (this.isVase(image) && image.quantityBySize) {
      // Para vasos, soma o preço base + extra por tamanho
      for (const size in image.quantityBySize) {
        const qty = image.quantityBySize[size] || 0;
        let vaseExtra = 0;
        switch (size) {
          case 'pequeno': vaseExtra = 2; break;
          case 'medio': vaseExtra = 4; break;
          case 'grande': vaseExtra = 6; break;
        }
        total += (image.price + vaseExtra) * qty; // <- soma o preço base + extra
      }
    } else {
      // Para flores, soma preço * quantidade
      total += (image.price || 0) * (image.quantity || 0);
    }
  });

  this.totalSum = total; // Atualiza total
}


  // Avança para a próxima página se houver seleção, senão mostra alerta
  goToPersonalizarUmPage() {
    if (this.totalSum === 0) {
      this.showAlert('Por favor, selecione algo para prosseguir.', '');
    } else {
      this.router.navigate(['/personalizar-um']); // Navega para próxima página
      this.encomendaService.setPendingTotal(this.totalSum); // Guarda o total na encomenda
    }
  }

  // Mostra um alerta com mensagem personalizada
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Pesquisa flores/vasos pelo título ou descrição
  searchFlowers(event: any) {
    const searchQuery = event.target.value?.toLowerCase();
    if (!searchQuery || searchQuery.trim() === '') {
      this.categorias = JSON.parse(JSON.stringify(this.originalCategorias)); // Restaura categorias originais
      return;
    }
    // Filtra as categorias e ramos pelo termo pesquisado
    this.categorias = this.originalCategorias
      .map(categoria => {
        const ramosFiltrados = categoria.ramos.filter(ramo =>
          ramo.title.toLowerCase().includes(searchQuery) ||
          ramo.description.toLowerCase().includes(searchQuery)
        );
        return { ...categoria, ramos: ramosFiltrados };  // Retorna a categoria com ramos filtrados
      })
      .filter(categoria => categoria.ramos.length > 0); // Remove categorias vazias
  }
}
