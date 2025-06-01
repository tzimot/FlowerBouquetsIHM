import { TestBed } from '@angular/core/testing';
// Importa o módulo de teste do Angular para configurar o ambiente de testes

import { CriarautentService } from './criarautent.service';
// Importa o serviço a ser testado

describe('CriarautentService', () => {
  // Define um conjunto de testes para o CriarautentService

  let service: CriarautentService;
  // Declara uma variável para armazenar a instância do serviço

  beforeEach(() => {
    // Executa antes de cada teste

    TestBed.configureTestingModule({});
    // Configura o módulo de testes (sem dependências adicionais)

    service = TestBed.inject(CriarautentService);
    // Injeta a instância do serviço a partir do TestBed
  });

  it('should be created', () => {
    // Define um teste: o serviço deve ser criado

    expect(service).toBeTruthy();
    // Verifica se a instância do serviço existe (não é null nem undefined)
  });
});
