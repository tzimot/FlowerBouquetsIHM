import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  addPontos(amount: number): void {
    let newPontos = this.pontosSubject.value + amount;
    if (newPontos < 0) newPontos = 0;
    this.pontosSubject.next(newPontos);
    localStorage.setItem('userPontos', newPontos.toString());
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
    localStorage.setItem('historicoCompras', JSON.stringify(this.historicoCompras));
  }

  // Método para carregar histórico do localStorage
  private carregarHistorico(): void {
    const historico = localStorage.getItem('historicoCompras');
    if (historico) {
      this.historicoCompras = JSON.parse(historico);
    }
  }

  loadPontos(): void {
    const saved = Number(localStorage.getItem('userPontos'));
    if (!isNaN(saved)) {
      this.pontosSubject.next(saved);
    }
  }

  constructor() {
    this.loadPontos();
    this.carregarHistorico();
  }
}