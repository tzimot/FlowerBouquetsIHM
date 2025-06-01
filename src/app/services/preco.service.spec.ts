import { TestBed } from '@angular/core/testing'; // Importa utilitários para configurar e testar o Angular

import { PrecoService } from './preco.service'; // Importa o serviço a ser testado

describe('PrecoService', () => { // Início do bloco de testes para o PrecoService
  let service: PrecoService; // Declaração da variável onde o serviço será armazenado

  beforeEach(() => { // Antes de cada teste, configurar o ambiente de teste
    TestBed.configureTestingModule({}); // Cria um módulo de teste vazio
    service = TestBed.inject(PrecoService); // Injeta uma instância do serviço
  });

  it('should be created', () => { // Teste simples para verificar se o serviço foi criado
    expect(service).toBeTruthy(); // Espera que o serviço exista (não seja null ou undefined)
  });
});
