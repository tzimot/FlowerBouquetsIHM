import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

export interface HistoricoCompra {
  id: string;
  data: string;
  valor: number;
  pontosGanhos: number;
  descricao: string;
  tipo: 'Os Nossos Ramos' | 'Personalizar Ramo' | 'Em Alta';
}

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {
  private total: number = 0;
  private pontosSubject = new BehaviorSubject<number>(0);
  private pendingTotal: number = 0; 
  private historicoCompras: HistoricoCompra[] = [];
  pontos$ = this.pontosSubject.asObservable();

  constructor(private authService: AuthService) {
    this.carregarDadosUsuarioAtual();
  }

  // Método para carregar dados do usuário atual
  async carregarDadosUsuarioAtual() {
    const user = await this.authService.getCurrentUser();
    if (user && user.username) {
      // Carregar pontos do usuário atual
      this.pontosSubject.next(user.points || 0);
      
      // Carregar histórico do usuário atual
      const historicoKey = `historicoCompras_${user.username}`;
      const historico = localStorage.getItem(historicoKey);
      if (historico) {
        this.historicoCompras = JSON.parse(historico);
      } else {
        this.historicoCompras = [];
      }
    } else {
      // Resetar dados quando não há usuário logado
      this.pontosSubject.next(0);
      this.historicoCompras = [];
    }
  }

  setTotal(total: number, adicionarPontos: boolean = true): void {
    this.total = total;
    if (adicionarPontos) {
      this.addPontos(Math.floor(total));
    }
  }

  getTotal(): number {
    return this.total;
  }

  getPontos(): number {
    return this.pontosSubject.value;
  }

  setPendingTotal(total: number) {
    this.pendingTotal = total;
  }

  getPendingTotal(): number {
    return this.pendingTotal;
  }

  async addPontos(amount: number): Promise<void> {
    let newPontos = this.pontosSubject.value + amount;
    if (newPontos < 0) newPontos = 0;
    this.pontosSubject.next(newPontos);
    
    // Atualizar pontos no perfil do usuário
    const user = await this.authService.getCurrentUser();
    if (user && user.username) {
      await this.authService.updatePoints(newPontos);
    }
  }

  // Novo método para adicionar compra ao histórico
  async adicionarCompraAoHistorico(valor: number, tipo: 'Os Nossos Ramos' | 'Personalizar Ramo' | 'Em Alta', descricao: string = ''): Promise<void> {
    const pontosGanhos = Math.floor(valor);
    const novaCompra: HistoricoCompra = {
      id: Date.now().toString(),
      data: new Date().toLocaleDateString('pt-PT'),
      valor: valor,
      pontosGanhos: pontosGanhos,
      descricao: descricao || `Compra em ${tipo}`,
      tipo: tipo
    };
    
    this.historicoCompras.unshift(novaCompra); // Adiciona no início da lista
    await this.salvarHistorico();
  }

  // Método para obter o histórico de compras
  getHistoricoCompras(): HistoricoCompra[] {
    return this.historicoCompras;
  }

  // Método para salvar histórico no localStorage por usuário
  private async salvarHistorico(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (user && user.username) {
      const historicoKey = `historicoCompras_${user.username}`;
      localStorage.setItem(historicoKey, JSON.stringify(this.historicoCompras));
    }
  }

  // Método para limpar dados ao fazer logout
  public limparDados(): void {
    this.pontosSubject.next(0);
    this.historicoCompras = [];
    this.total = 0;
    this.pendingTotal = 0;
  }
}