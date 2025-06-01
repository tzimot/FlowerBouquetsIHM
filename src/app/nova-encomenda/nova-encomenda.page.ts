import { Component, OnInit } from '@angular/core'; // Importa Component e OnInit do Angular
import { Router } from '@angular/router'; // Importa Router para navegação entre páginas
import { AlertController } from '@ionic/angular'; // Importa AlertController para criar alertas no Ionic
import { PrecoNEService } from 'src/app/services/preco-ne.service'; // Importa serviço que gere o preço total

// Define interface para os dados das imagens
interface ImageData {
  id: number;           // Identificador único da imagem
  title: string;        // Título da imagem/produto
  image: string;        // Caminho para a imagem
  price: number;        // Preço do produto
  description: string;  // Descrição do produto
  quantity: number;     // Quantidade selecionada pelo utilizador
}

@Component({
  selector: 'app-nova-encomenda', // Nome do seletor do componente
  templateUrl: './nova-encomenda.page.html', // Ligação ao template HTML
  styleUrls: ['./nova-encomenda.page.scss'], // Ligação aos estilos CSS/SCSS
})
export class NovaEncomendaPage implements OnInit {

  public images: ImageData[];       // Lista de imagens/produtos carregados
  public totalSum: number;          // Soma total dos preços dos produtos selecionados
  filteredImages: ImageData[] = []; // Lista filtrada para pesquisa

  constructor(
    private router: Router,               // Serviço para navegação entre páginas
    private alertController: AlertController, // Serviço para criar alertas
    private preconeService: PrecoNEService     // Serviço para gerir preço total da encomenda
  ) {
    this.images = [];                   // Inicializa a lista de imagens vazia
    this.totalSum = 0;                  // Inicializa o total da soma a 0
  }

  ngOnInit() {
    fetch('./assets/imgsData/imagens.json')  // Busca o ficheiro JSON com os dados das imagens
      .then(res => res.json())               // Converte a resposta para JSON
      .then(json => {
        this.images = json;                  // Guarda os dados das imagens na variável
        this.calculateTotalSum();            // Calcula a soma total inicial (provavelmente 0)
        this.preconeService.setPrecoValue(this.totalSum); // Atualiza o preço no serviço

        this.filteredImages = this.images;   // Inicializa a lista filtrada com todas as imagens
      });
  }

  decreaseQuantity(image: ImageData) { // Método para diminuir quantidade do produto
    if (image.quantity && image.quantity > 0) { // Só diminui se quantidade for maior que zero
      image.quantity--;
      this.calculateTotalSum();        // Recalcula a soma total após alteração
    }
  }

  increaseQuantity(image: ImageData) { // Método para aumentar quantidade do produto
    if (image.quantity) {               // Se já existe quantidade definida
      image.quantity++;
      this.calculateTotalSum();        // Recalcula a soma total
    } else {
      image.quantity = 1;               // Se não existia, inicializa a 1
      this.calculateTotalSum();
    }
  }

  calculateTotalSum() {                // Calcula o total multiplicando quantidade e preço de cada imagem
    this.totalSum = this.images.reduce(
      (sum, image) => sum + (image.quantity || 0) * (image.price || 0),
      0
    );
  }

  goToNovaEncomendaUmPage() {         // Método para navegar para a próxima página
    if (this.totalSum === 0) {         // Se nenhum produto selecionado
      this.showAlert('Por favor, selecione algo para prosseguir.', ''); // Mostra alerta
    } else {
      this.preconeService.setPrecoValue(this.totalSum); // Atualiza preço no serviço
      this.router.navigate(['/nova-encomenda-um']); // Navega para página seguinte
    }
  }

  async showAlert(header: string, message: string) { // Cria e apresenta alerta
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  searchFlowers(event: any) {           // Pesquisa/filter para imagens por título
    const searchQuery = event.target.value; // Valor inserido pelo utilizador
    this.filteredImages = this.images.filter((image) =>
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filtra ignorando maiúsculas/minúsculas
    );
  }

}
