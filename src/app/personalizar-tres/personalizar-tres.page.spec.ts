// Importa funcionalidades para testes de componentes Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// Importa o componente a ser testado
import { PersonalizarTresPage } from './personalizar-tres.page';

// Define o conjunto de testes para a página PersonalizarTresPage
describe('PersonalizarTresPage', () => {
  let component: PersonalizarTresPage; // Variável para a instância do componente
  let fixture: ComponentFixture<PersonalizarTresPage>; // Fixture para manipular o componente no teste

  // Antes de cada teste, executa este bloco assincronamente
  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(PersonalizarTresPage); // Cria a instância do componente
    component = fixture.componentInstance; // Acede à instância do componente criada
    fixture.detectChanges(); // Dispara deteção de alterações para inicializar o componente
  }));

  // Teste que verifica se o componente foi criado com sucesso
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica se o componente existe (não é nulo)
  });
});
