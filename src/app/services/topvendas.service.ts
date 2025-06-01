import { Injectable } from '@angular/core'; // Importa o decorator Injectable do Angular

@Injectable({
  providedIn: 'root' // Regista o serviço para ser singleton e disponível globalmente na app
})
export class TopvendasService {

  private precoValue: number = 0; // Variável privada que guarda o valor do preço

  // Método para definir o valor do preço
  setPrecoValue(value: number) {
    this.precoValue = value;
  }

  // Método para obter o valor atual do preço
  getPrecoValue() {
    return this.precoValue;
  }

  constructor() { } // Construtor vazio (inicialização padrão)
}
