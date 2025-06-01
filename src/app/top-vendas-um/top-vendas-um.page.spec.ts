import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'; // Importa ferramentas para testes de componentes Angular
import { TopVendasUmPage } from './top-vendas-um.page'; // Importa o componente que vai ser testado

describe('TopVendasUmPage', () => { // Define o grupo de testes para o componente TopVendasUmPage
  let component: TopVendasUmPage; // Variável para armazenar a instância do componente
  let fixture: ComponentFixture<TopVendasUmPage>; // Variável para controlar o ambiente de teste do componente

  beforeEach(waitForAsync(() => { // Antes de cada teste, prepara o ambiente assincronamente
    fixture = TestBed.createComponent(TopVendasUmPage); // Cria a instância do componente dentro do ambiente de teste
    component = fixture.componentInstance; // Atribui a instância criada à variável component
    fixture.detectChanges(); // Detecta e aplica alterações no template e no componente
  }));

  it('should create', () => { // Teste que verifica se o componente foi criado com sucesso
    expect(component).toBeTruthy(); // Espera que a instância do componente exista e seja verdadeira (não nula)
  });
});
