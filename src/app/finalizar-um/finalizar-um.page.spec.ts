import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'; // Importa ferramentas para testes
import { FinalizarUmPage } from './finalizar-um.page'; // Importa o componente a testar

describe('FinalizarUmPage', () => { // Grupo de testes para FinalizarUmPage
  let component: FinalizarUmPage; // Variável para instância do componente
  let fixture: ComponentFixture<FinalizarUmPage>; // Fixture para manipular componente e DOM

  beforeEach(waitForAsync(() => { // Configura antes de cada teste, de forma assíncrona
    fixture = TestBed.createComponent(FinalizarUmPage); // Cria instância do componente para teste
    component = fixture.componentInstance; // Acede à instância do componente
    fixture.detectChanges(); // Aplica detecção de alterações para inicializar o componente
  }));

  it('should create', () => { // Teste que verifica se o componente foi criado
    expect(component).toBeTruthy(); // Espera que o componente exista e seja válido
  });
});
