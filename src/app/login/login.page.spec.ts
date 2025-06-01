import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa ferramentas para testes Angular
import { IonicModule } from '@ionic/angular'; // Importa módulo do Ionic para testes
import { LoginPage } from './login.page'; // Importa o componente LoginPage

describe('LoginPage', () => { // Define grupo de testes para LoginPage
  let component: LoginPage; // Variável para instância do componente
  let fixture: ComponentFixture<LoginPage>; // Fixture para manipular componente e DOM

  beforeEach(async () => { // Setup antes de cada teste, assíncrono
    await TestBed.configureTestingModule({ // Configura o módulo de teste
      declarations: [LoginPage], // Declara o componente a testar
      imports: [IonicModule.forRoot()] // Importa módulo Ionic inicializado
    }).compileComponents(); // Compila componentes declarados

    fixture = TestBed.createComponent(LoginPage); // Cria instância do componente
    component = fixture.componentInstance; // Obtem a instância do componente
    fixture.detectChanges(); // Aplica deteção de alterações
  });

  it('should create', () => { // Teste para verificar criação do componente
    expect(component).toBeTruthy(); // Espera que o componente exista (não seja falso)
  });
});
