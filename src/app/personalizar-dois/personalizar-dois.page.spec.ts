import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // Importa utilitários de teste do Angular
import { PersonalizarDoisPage } from './personalizar-dois.page'; // Importa o componente a ser testado

// Define um conjunto de testes para o componente
describe('PersonalizarDoisPage', () => {
  let component: PersonalizarDoisPage; // Declaração da variável do componente
  let fixture: ComponentFixture<PersonalizarDoisPage>; // Declaração da "instância de teste" do componente

  // Executado antes de cada teste
  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalizarDoisPage); // Cria uma instância do componente para testes
    component = fixture.componentInstance; // Obtém a instância do componente
    fixture.detectChanges(); // Aplica as mudanças e inicializa o ciclo de vida do Angular
  }));

  // Teste simples: verifica se o componente foi criado com sucesso
  it('should create', () => {
    expect(component).toBeTruthy(); // Espera que a instância do componente seja válida
  });
});
