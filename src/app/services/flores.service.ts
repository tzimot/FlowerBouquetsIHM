import { Injectable } from '@angular/core'; // Permite que esta classe seja injetada em outras
import { HttpClient } from '@angular/common/http'; // Usado para fazer pedidos HTTP
import { Observable } from 'rxjs'; // Observable para trabalhar com dados assíncronos
import { map } from 'rxjs/operators'; // Operador usado para transformar dados

// Define a estrutura dos dados de imagem
export interface ImageData {
  id: number; // Identificador da flor
  title: string; // Nome da flor
  image: string; // Caminho para a imagem da flor
  price: number; // Preço da flor
  description: string; // Descrição da flor
  quantity: number; // Quantidade selecionada ou disponível
}

@Injectable({
  providedIn: 'root' // Torna este serviço acessível em toda a aplicação
})
export class FloresService {
  private apiUrl = './assets/imgsData/imagens.json'; // Caminho do ficheiro JSON com os dados das flores

  constructor(private http: HttpClient) {} // Injeta o HttpClient para fazer pedidos ao JSON

  getFlowers(): Observable<ImageData[]> { // Devolve todas as flores do ficheiro
    return this.http.get<ImageData[]>(this.apiUrl); // Faz o GET ao JSON e transforma em array de ImageData
  }

  getTopVendas(): Observable<ImageData[]> { // Devolve apenas flores específicas consideradas "top vendas"
    return this.getFlowers().pipe( // Reutiliza getFlowers e aplica um filtro
      map(flowers => flowers.filter(flower => [7, 8, 9].includes(flower.id))) // Filtra por ID 7, 8 e 9
    );
  }

}
