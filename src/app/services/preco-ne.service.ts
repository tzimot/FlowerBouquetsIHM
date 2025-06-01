import { Injectable } from '@angular/core'; // Importa o decorador Injectable do Angular

@Injectable({
  providedIn: 'root' // Define que este serviço estará disponível globalmente (injeção na root)
})
export class PrecoNEService {

  private precoValue: number = 0; // Armazena o valor do preço internamente

  setPrecoValue(value: number) { // Define o valor do preço
    this.precoValue = value;
  }

  getPrecoValue() { // Retorna o valor do preço atual
    return this.precoValue;
  }

  constructor() { } // Construtor vazio (poderia ser usado para inicializações futuras)
}
