import { TestBed } from '@angular/core/testing';
// Importa o módulo de testes do Angular

import { FloresService } from './flores.service';
// Importa o serviço que vai ser testado

describe('FloresService', () => {
  let service: FloresService;
  // Declara uma variável para o serviço a testar

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Configura o ambiente de testes (pode ser configurado com dependências se necessário)

    service = TestBed.inject(FloresService);
    // Injeta o serviço para ser usado nos testes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    // Testa se o serviço foi criado com sucesso (existe e não é null ou undefined)
  });
});
