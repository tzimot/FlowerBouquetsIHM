import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // Importa ferramentas para testar componentes (e o async)
import { NovaEncomendaDoisPage } from './nova-encomenda-dois.page'; // Importa a página que vamos testar

describe('NovaEncomendaDoisPage', () => { // Começa o bloco de testes para a página
  let component: NovaEncomendaDoisPage; // Declara o componente a testar
  let fixture: ComponentFixture<NovaEncomendaDoisPage>; // Declara o ambiente de teste do componente

  beforeEach(async(() => { // Antes de cada teste, prepara o ambiente
    fixture = TestBed.createComponent(NovaEncomendaDoisPage); // Cria o componente e o ambiente de teste
    component = fixture.componentInstance; // Associa o componente criado
    fixture.detectChanges(); // Atualiza o componente com dados iniciais
  }));

  it('should create', () => { // Teste que verifica se o componente é criado com sucesso
    expect(component).toBeTruthy(); // Espera que o componente exista (não seja null ou undefined)
  });
});
