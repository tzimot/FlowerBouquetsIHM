import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // Importa utilitários para testes de componentes Angular
import { NovaEncomendaPage } from './nova-encomenda.page'; // Importa o componente NovaEncomendaPage

describe('NovaEncomendaPage', () => { // Define um grupo de testes para a página NovaEncomendaPage
  let component: NovaEncomendaPage; // Variável para armazenar a instância do componente
  let fixture: ComponentFixture<NovaEncomendaPage>; // Variável para controlar o ambiente de teste do componente

  beforeEach(async(() => { // Configuração executada antes de cada teste, em modo assíncrono
    fixture = TestBed.createComponent(NovaEncomendaPage); // Cria uma instância do componente para teste
    component = fixture.componentInstance; // Obtém a instância do componente a partir do fixture
    fixture.detectChanges(); // Detecta mudanças para atualizar o template do componente
  }));

  it('should create', () => { // Teste que verifica se o componente foi criado corretamente
    expect(component).toBeTruthy(); // Espera que o componente exista e seja verdadeiro (criado com sucesso)
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

