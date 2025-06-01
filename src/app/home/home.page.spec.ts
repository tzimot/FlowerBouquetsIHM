import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'; // Importa ferramentas para testes, incluindo waitForAsync
import { HomePage } from './home.page'; // Importa o componente HomePage

describe('HomePage', () => { // Define o grupo de testes para HomePage
  let component: HomePage; // Variável para a instância do componente
  let fixture: ComponentFixture<HomePage>; // Fixture para manipular componente e DOM

  beforeEach(waitForAsync(() => { // Configura antes de cada teste, de forma assíncrona
    fixture = TestBed.createComponent(HomePage); // Cria instância do componente
    component = fixture.componentInstance; // Obtém a instância do componente
    fixture.detectChanges(); // Aplica a deteção de alterações
  }));

  it('should create', () => { // Teste para verificar se o componente foi criado
    expect(component).toBeTruthy(); // Espera que o componente exista (não seja falso)
  });
});
