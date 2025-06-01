import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // Importa ferramentas de teste do Angular
import { NovaEncomendaTresPage } from './nova-encomenda-tres.page'; // Importa o componente a ser testado

describe('NovaEncomendaTresPage', () => { // Descreve o grupo de testes para esta página
  let component: NovaEncomendaTresPage; // Declaração da instância do componente
  let fixture: ComponentFixture<NovaEncomendaTresPage>; // Declaração do fixture para manipular o DOM e a instância

  beforeEach(async(() => { // Antes de cada teste, configura o ambiente
    fixture = TestBed.createComponent(NovaEncomendaTresPage); // Cria o componente
    component = fixture.componentInstance; // Obtém a instância do componente
    fixture.detectChanges(); // Aplica as mudanças iniciais (ngOnInit, etc.)
  }));

  it('should create', () => { // Teste simples para verificar se o componente foi criado com sucesso
    expect(component).toBeTruthy(); // Espera-se que a instância seja verdadeira (exista)
  });
});
