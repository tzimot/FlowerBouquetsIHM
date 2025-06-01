
import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // Importa as ferramentas de teste do Angular
import { NovaEncomendaUmPage } from './nova-encomenda-um.page'; // Importa o componente que será testado

describe('NovaEncomendaUmPage', () => { // Define um bloco de testes para o componente
  let component: NovaEncomendaUmPage; // Declara a variável para o componente
  let fixture: ComponentFixture<NovaEncomendaUmPage>; // Declara a variável para o fixture do componente


  beforeEach(async(() => { // Antes de cada teste, configura o ambiente
    fixture = TestBed.createComponent(NovaEncomendaUmPage); // Cria a instância do componente
    component = fixture.componentInstance; // Acede à instância do componente
    fixture.detectChanges(); // Aplica as detecções de alterações para refletir o estado atual
  }));

  it('should create', () => { // Teste que verifica se o componente é criado corretamente
    expect(component).toBeTruthy(); // Espera que o componente exista (não seja null ou undefined)
  });
});
