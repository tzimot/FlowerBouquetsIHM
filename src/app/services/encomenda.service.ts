import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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
  private userId: string = '';
  private resetQuantitiesSubject = new Subject<void>();
  resetQuantities$ = this.resetQuantitiesSubject.asObservable();
  pontos$ = this.pontosSubject.asObservable();

  constructor(private authService: AuthService) {
    this.carregarDadosUsuarioAtual();
  }

  emitResetQuantities() {
    this.resetQuantitiesSubject.next();
  }

  async carregarDadosUsuarioAtual() {
    const user = await this.authService.getCurrentUser();
    if (user && user.username) {
      this.userId = user.username;

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
      this.userId = '';
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

  setUserId(userId: string): void {
    this.userId = userId;
    this.loadPontos();
    this.carregarHistorico();
  }

  private getPontosKey(): string {
    return `userPontos_${this.userId}`;
  }

  private getHistoricoKey(): string {
    return `historicoCompras_${this.userId}`;
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

    const user = await this.authService.getCurrentUser();
    if (user && user.username) {
      await this.authService.updatePoints(newPontos);
    } else if (this.userId) {
      localStorage.setItem(this.getPontosKey(), newPontos.toString());
    }
  }

  async adicionarCompraAoHistorico(
    valor: number,
    tipo: 'Os Nossos Ramos' | 'Personalizar Ramo' | 'Em Alta',
    descricao: string = ''
  ): Promise<void> {
    const pontosGanhos = Math.floor(valor);
    const novaCompra: HistoricoCompra = {
      id: Date.now().toString(),
      data: new Date().toLocaleDateString('pt-PT'),
      valor: valor,
      pontosGanhos: pontosGanhos,
      descricao: descricao || `Compra em ${tipo}`,
      tipo: tipo
    };

    this.historicoCompras.unshift(novaCompra);
    await this.salvarHistorico();
  }

  getHistoricoCompras(): HistoricoCompra[] {
    return this.historicoCompras;
  }

  private async salvarHistorico(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (user && user.username) {
      const historicoKey = `historicoCompras_${user.username}`;
      localStorage.setItem(historicoKey, JSON.stringify(this.historicoCompras));
    } else if (this.userId) {
      localStorage.setItem(this.getHistoricoKey(), JSON.stringify(this.historicoCompras));
    }
  }

  private carregarHistorico(): void {
    if (this.userId) {
      const historico = localStorage.getItem(this.getHistoricoKey());
      this.historicoCompras = historico ? JSON.parse(historico) : [];
    } else {
      this.historicoCompras = [];
    }
  }

  loadPontos(): void {
    if (this.userId) {
      const saved = Number(localStorage.getItem(this.getPontosKey()));
      this.pontosSubject.next(!isNaN(saved) ? saved : 0);
    } else {
      this.pontosSubject.next(0);
    }
  }

  logout(): void {
    this.userId = '';
    this.pontosSubject.next(0);
    this.historicoCompras = [];
  }

  public limparDados(): void {
    this.pontosSubject.next(0);
    this.historicoCompras = [];
    this.total = 0;
    this.pendingTotal = 0;
  }
}
