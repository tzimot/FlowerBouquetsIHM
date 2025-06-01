import { TestBed } from '@angular/core/testing'; // Importa utilitários de teste do Angular

import { PrecoNEService } from './preco-ne.service'; // Importa o serviço a ser testado

describe('PrecoNEService', () => { // Define um conjunto de testes para o PrecoNEService
  let service: PrecoNEService; // Declara uma variável para guardar a instância do serviço

  beforeEach(() => { // Antes de cada teste...
    TestBed.configureTestingModule({}); // Configura o ambiente de teste sem módulos adicionais
    service = TestBed.inject(PrecoNEService); // Injeta uma instância do PrecoNEService
  });

  it('should be created', () => { // Testa se o serviço foi criado com sucesso
    expect(service).toBeTruthy(); // Verifica que a instância não é null ou undefined
  });
});
