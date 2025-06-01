import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // Importa utilitários para testes,
import { IonicModule } from '@ionic/angular';
import { CancelarPage } from './cancelar.page'; // Importa o componente a ser testado

describe('CancelarPage', () => { // Descreve o conjunto de testes para o componente CancelarPage
  let component: CancelarPage; // Declara a variável do componente
  let fixture: ComponentFixture<CancelarPage>; // Declara a variável que contém a instância renderizada do componente

  beforeEach(async(() => { // Executa antes de cada teste, de forma assíncrona
    TestBed.configureTestingModule({ 
      declarations: [CancelarPage], // Declara o componente a ser testado
      imports: [IonicModule.forRoot()], // Importa o módulo do Ionic necessário para o teste funcionar
    }).compileComponents(); // Compila os componentes declarados

    fixture = TestBed.createComponent(CancelarPage); // Cria a instância do componente para teste
    component = fixture.componentInstance; // Acede à instância do componente
    fixture.detectChanges(); // Deteta alterações
  }));

  it('should create', () => { // Define um teste com a descrição "should create"
    expect(component).toBeTruthy(); // Verifica se o componente foi criado com sucesso
  });
});
