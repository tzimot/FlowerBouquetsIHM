import { Injectable } from '@angular/core'; // Importa o decorador Injectable do Angular

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação (injeção no root)
})
export class PrecoService { // Declaração da classe do serviço

  private precoValue: number = 0; // Variável privada que armazena o valor do preço

  setPrecoValue(value: number) { // Método para definir o valor do preço
    this.precoValue = value; // Atribui o valor recebido à variável privada
  }

  getPrecoValue() { // Método para obter o valor do preço
    return this.precoValue; // Retorna o valor armazenado
  }

  constructor() { } // Construtor vazio
}
