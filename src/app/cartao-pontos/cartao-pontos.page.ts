import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EncomendaService, HistoricoCompra } from '../services/encomenda.service';

@Component({
  selector: 'app-cartao-pontos',              
  templateUrl: './cartao-pontos.page.html',   // Caminho para o ficheiro HTML do componente
  styleUrls: ['./cartao-pontos.page.scss'],   // Caminho para o ficheiro de estilos do componente
})
export class CartaoPontosPage implements OnInit {
  userData = {
    username: '',    
    fullName: '',
    email: '',
    profilePicture: '',
    birthDate: '', 
    pontos: 0
  };

  historicoCompras: HistoricoCompra[] = [];
  mostrarHistorico: boolean = false;

  constructor(
    private authService: AuthService,
    private encomendaService: EncomendaService
  ) {}

  async ngOnInit() {
    await this.loadUserData();
    this.encomendaService.pontos$.subscribe(pontos => {
      this.userData.pontos = pontos;
    });
    this.carregarHistorico();
  }

  async ionViewWillEnter() {
    await this.loadUserData();
    this.carregarHistorico();
  }

  private async loadUserData() {
    try {
      const user = await this.authService.getCurrentUser();
      this.userData = {
        ...this.userData,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        birthDate: user.birthDate || ''
      };
    } catch (error) {
      console.error('Erro ao carregar dados do utilizador:', error);
    }
  }

  private carregarHistorico() {
    this.historicoCompras = this.encomendaService.getHistoricoCompras();
  }

  toggleHistorico() {
    this.mostrarHistorico = !this.mostrarHistorico;
  }

  getTotalGasto(): number {
    return this.historicoCompras.reduce((total, compra) => total + compra.valor, 0);
  }

  getTotalPontosGanhos(): number {
    return this.historicoCompras.reduce((total, compra) => total + compra.pontosGanhos, 0);
  }

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