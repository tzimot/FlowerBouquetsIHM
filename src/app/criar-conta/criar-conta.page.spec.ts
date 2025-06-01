import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'; // Importa ferramentas para testes
import { CriarContaPage } from './criar-conta.page'; // Importa o componente a testar

describe('CriarContaPage', () => { // Define o grupo de testes para o componente CriarContaPage
  let component: CriarContaPage; // Declara a variável do componente
  let fixture: ComponentFixture<CriarContaPage>; // Declara o fixture que contém o componente e o DOM

  beforeEach(waitForAsync(() => { // Configura o ambiente de testes antes de cada teste, de forma assíncrona
    fixture = TestBed.createComponent(CriarContaPage); // Cria a instância do componente
    component = fixture.componentInstance; // Acede à instância do componente
    fixture.detectChanges(); // Aplica as alterações do Angular e inicia o ciclo de vida
  }));

  it('should create', () => { // Teste que verifica se o componente é criado com sucesso
    expect(component).toBeTruthy(); // Espera que o componente exista e seja válido
  });
});
