import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // Importa utilitários para testes do Angular
import { TopVendasTresPage } from './top-vendas-tres.page'; // Importa o componente a ser testado

describe('TopVendasTresPage', () => { // Define um grupo de testes para a página TopVendasTres
  let component: TopVendasTresPage; // Declara variável para armazenar a instância do componente
  let fixture: ComponentFixture<TopVendasTresPage>; // Declara variável para o fixture do componente (manipular o componente no teste)

  beforeEach(async(() => { // Função executada antes de cada teste, configura o ambiente
    fixture = TestBed.createComponent(TopVendasTresPage); // Cria uma instância do componente no ambiente de teste
    component = fixture.componentInstance; // Obtém a instância real do componente criado
    fixture.detectChanges(); // Aplica as mudanças e inicializa o componente
  }));

  it('should create', () => { // Teste que verifica se o componente foi criado com sucesso
    expect(component).toBeTruthy(); // Espera que o componente exista (não seja null ou undefined)
  });
});
