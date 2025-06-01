import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// Importa utilitários para criar um ambiente de teste para componentes Angular

import { PersonalizarUmPage } from './personalizar-um.page';
// Importa o componente que vai ser testado

describe('PersonalizarUmPage', () => {
// Define um bloco de testes para a página PersonalizarUmPage

  let component: PersonalizarUmPage;
  // Declara uma variável para armazenar a instância do componente

  let fixture: ComponentFixture<PersonalizarUmPage>;
  // Declara uma variável para controlar o ambiente de teste do componente

  beforeEach(async(() => {
  // Função executada antes de cada teste; async para tratar operações assíncronas

    fixture = TestBed.createComponent(PersonalizarUmPage);
    // Cria uma instância do componente num ambiente de teste

    component = fixture.componentInstance;
    // Atribui a instância do componente à variável 'component'

    fixture.detectChanges();
    // Deteta alterações no componente e atualiza a view para o teste
  }));

  it('should create', () => {
  // Define um teste que verifica se o componente foi criado corretamente

    expect(component).toBeTruthy();
    // Verifica que o componente existe e foi instanciado sem erros
  });
});
