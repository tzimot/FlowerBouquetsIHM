import { Component, OnInit } from '@angular/core'; // Importa os módulos necessários do Angular
import { AuthService } from '../services/auth.service'; // Serviço de autenticação do utilizador
import { EncomendaService, HistoricoCompra } from '../services/encomenda.service'; // Serviço de encomendas e tipo para histórico

@Component({
  selector: 'app-cartao-pontos',              // Seletor do componente
  templateUrl: './cartao-pontos.page.html',   // Caminho para o ficheiro HTML do componente
  styleUrls: ['./cartao-pontos.page.scss'],   // Caminho para o ficheiro de estilos do componente
})
export class CartaoPontosPage implements OnInit {
  // Dados do utilizador a apresentar
  userData = {
    username: '',    
    fullName: '',
    email: '',
    profilePicture: '',
    birthDate: '', 
    pontos: 0
  };

  historicoCompras: HistoricoCompra[] = []; // Lista de compras do utilizador
  mostrarHistorico: boolean = false;        // Controla a visibilidade do histórico

  constructor(
    private authService: AuthService,           // Injeta o serviço de autenticação
    private encomendaService: EncomendaService  // Injeta o serviço de encomendas
  ) {}

  // Executa ao inicializar o componente
  async ngOnInit() {
    await this.loadUserData(); // Carrega dados do utilizador
    this.encomendaService.pontos$.subscribe(pontos => {
      this.userData.pontos = pontos; // Atualiza pontos em tempo real
    });
    this.carregarHistorico(); // Carrega histórico de compras
  }

  // Executa sempre que a página vai ser apresentada
  async ionViewWillEnter() {
    await this.loadUserData(); // Atualiza dados do utilizador
    this.carregarHistorico();  // Atualiza histórico de compras
  }

  // Carrega dados do utilizador autenticado
  private async loadUserData() {
    try {
      const user = await this.authService.getCurrentUser(); // Obtém utilizador atual
      this.userData = {
        ...this.userData, // Mantém os dados existentes do utilizador
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        birthDate: user.birthDate || ''
      };
    } catch (error) {
      console.error('Erro ao carregar dados do utilizador:', error); // Log de erro
    }
  }

  // Carrega o histórico de compras do utilizador
  private carregarHistorico() {
    this.historicoCompras = this.encomendaService.getHistoricoCompras();
  }

  // Alterna a visibilidade do histórico de compras
  toggleHistorico() {
    this.mostrarHistorico = !this.mostrarHistorico;
  }

  // Calcula o total gasto pelo utilizador
  getTotalGasto(): number {
    return this.historicoCompras.reduce((total, compra) => total + compra.valor, 0);
  }

  // Calcula o total de pontos ganhos pelo utilizador
  getTotalPontosGanhos(): number {
    return this.historicoCompras.reduce((total, compra) => total + compra.pontosGanhos, 0);
  }

  // Retorna o ícone correspondente ao tipo de compra
  getIconePorTipo(tipo: string): string {
    switch (tipo) {
      case 'Os Nossos Ramos':
        return 'flower-outline';
      case 'Personalizar Ramo':
        return 'brush-outline';
      case 'Em Alta':
        return 'trending-up-outline';
      default:
        return 'bag-outline';
    }
  }

  // Retorna a cor correspondente ao tipo de compra
  getCorPorTipo(tipo: string): string {
    switch (tipo) {
      case 'Os Nossos Ramos':
        return 'success';
      case 'Personalizar Ramo':
        return 'secondary';
      case 'Em Alta':
        return 'warning';
      default:
        return 'medium';
    }
  }
}