import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

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

  emitResetQuantities() {
    this.resetQuantitiesSubject.next();
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

  addPontos(amount: number): void {
    let newPontos = this.pontosSubject.value + amount;
    if (newPontos < 0) newPontos = 0;
    this.pontosSubject.next(newPontos);
    if (this.userId) {
      localStorage.setItem(this.getPontosKey(), newPontos.toString());
    }
  }

  // Novo método para adicionar compra ao histórico
  adicionarCompraAoHistorico(valor: number, tipo: 'Os Nossos Ramos' | 'Personalizar Ramo' | 'Em Alta', descricao: string = ''): void {
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
    this.salvarHistorico();
  }

  // Método para obter o histórico de compras
  getHistoricoCompras(): HistoricoCompra[] {
    return this.historicoCompras;
  }

  // Método para salvar histórico no localStorage
  private salvarHistorico(): void {
    if (this.userId) {
      localStorage.setItem(this.getHistoricoKey(), JSON.stringify(this.historicoCompras));
    }
  }

  // Método para carregar histórico do localStorage
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

  constructor() {
    // Não carregar pontos nem histórico no construtor, pois não há userId definido ainda
  }
}