import { TestBed } from '@angular/core/testing'; // Importa o módulo de testes do Angular

import { TopvendasService } from './topvendas.service'; // Importa o serviço que será testado

describe('TopvendasService', () => { // Descreve o grupo de testes para o serviço TopvendasService
  let service: TopvendasService; // Declara a variável que irá armazenar a instância do serviço

  beforeEach(() => { // Executa antes de cada teste
    TestBed.configureTestingModule({}); // Configura o ambiente de teste sem dependências específicas
    service = TestBed.inject(TopvendasService); // Injeta o serviço a ser testado
  });

  it('should be created', () => { // Teste que verifica se o serviço foi criado com sucesso
    expect(service).toBeTruthy(); // Espera que o serviço não seja null/undefined (foi instanciado)
  });
});
