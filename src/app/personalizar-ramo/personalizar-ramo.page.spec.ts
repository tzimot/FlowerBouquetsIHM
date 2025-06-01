// Importa as classes necessárias para fazer testes de componentes no Angular
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

// Importa o componente que vais testar
import { PersonalizarRamoPage } from './personalizar-ramo.page';

// Define um conjunto de testes para o componente PersonalizarRamoPage
describe('PersonalizarRamoPage', () => {

  // Declara duas variáveis: uma para o componente e outra para o "ambiente" de teste dele
  let component: PersonalizarRamoPage;
  let fixture: ComponentFixture<PersonalizarRamoPage>;

  // Esta função corre antes de cada teste
  beforeEach(async () => {
    // Cria o módulo de teste com o componente que vai ser testado
    await TestBed.configureTestingModule({
      declarations: [PersonalizarRamoPage] // Declara o componente a testar
    }).compileComponents(); // Compila os componentes (necessário para testes com templates)

    // Cria a instância do componente na memória, pronto para testes
    fixture = TestBed.createComponent(PersonalizarRamoPage);

    // Acede à instância do componente criado
    component = fixture.componentInstance;

    // Dispara a deteção de alterações (como o ngOnInit e a renderização do template)
    fixture.detectChanges();
  });

  // Teste simples que verifica se o componente foi criado com sucesso
  it('should create', () => {
    expect(component).toBeTruthy(); // Espera que o componente exista (true)
  });
});
