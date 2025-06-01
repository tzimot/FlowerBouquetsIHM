import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // Importa utilitários para testes de componentes
import { ObrigadoPage } from './obrigado.page'; // Importa o componente ObrigadoPage

describe('ObrigadoPage', () => { // Descreve a suite de testes para o componente ObrigadoPage
  let component: ObrigadoPage; // Declara a variável do componente
  let fixture: ComponentFixture<ObrigadoPage>; // Declara a variável do fixture que encapsula o componente

  beforeEach(async(() => { // Antes de cada teste, prepara o ambiente
    fixture = TestBed.createComponent(ObrigadoPage); // Cria uma instância do componente ObrigadoPage
    component = fixture.componentInstance; // Obtém a instância do componente
    fixture.detectChanges(); // Aplica as mudanças iniciais
  }));

  it('should create', () => { // Testa se o componente é criado corretamente
    expect(component).toBeTruthy(); // Espera que a instância do componente exista (não seja null ou undefined)
  });
});
