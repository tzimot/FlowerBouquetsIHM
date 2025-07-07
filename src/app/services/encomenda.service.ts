import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';

// Interface que define a estrutura de um item do histórico de compras
export interface HistoricoCompra {
  id: string;                     // Identificador único da compra
  data: string;                   // Data da compra em formato string
  valor: number;                  // Valor total da compra
  pontosGanhos: number;           // Pontos ganhos com esta compra
  descricao: string;              // Descrição da compra
  tipo: 'Os Nossos Ramos' | 'Personalizar Ramo' | 'Em Alta';  // Tipo de compra
}

// Decorador Injectable - disponível em toda a aplicação
@Injectable({
  providedIn: 'root'
})
export class EncomendaService {
  // Propriedades privadas
  private total: number = 0;  // Valor total atual da compra
  private pontosSubject = new BehaviorSubject<number>(0);  // Observable para pontos
  private pendingTotal: number = 0;  // Total temporário durante o processo de checkout
  private historicoCompras: HistoricoCompra[] = [];  // Array com histórico de compras
  private userId: string = '';  // ID do utilizador atual
  
  // Subjects e Observables
  private resetQuantitiesSubject = new Subject<void>();  // Subject para resetar quantidades
  resetQuantities$ = this.resetQuantitiesSubject.asObservable();  // Observable para reset
  pontos$ = this.pontosSubject.asObservable();  // Observable público para pontos

  // Construtor com injeção de dependências
  constructor(private authService: AuthService) {
    // Carregar dados do utilizador quando o serviço é inicializado
    this.carregarDadosUsuarioAtual();
  }

  // Emitir evento para resetar quantidades
  emitResetQuantities() {
    this.resetQuantitiesSubject.next();
  }

  // Carregar dados do utilizador atual a partir do auth service
  async carregarDadosUsuarioAtual() {
    const user = await this.authService.getCurrentUser();
    if (user && user.username) {
      this.userId = user.username;

      // Atualizar pontos com os pontos atuais do utilizador
      this.pontosSubject.next(user.points || 0);

      // Carregar histórico de compras do localStorage
      const historicoKey = `historicoCompras_${user.username}`;
      const historico = localStorage.getItem(historicoKey);
      this.historicoCompras = historico ? JSON.parse(historico) : [];
    } else {
      // Resetar se não houver utilizador autenticado
      this.userId = '';
      this.pontosSubject.next(0);
      this.historicoCompras = [];
    }
  }

  // Definir o valor total da compra e opcionalmente adicionar pontos
  setTotal(total: number, adicionarPontos: boolean = true): void {
    this.total = total;
    if (adicionarPontos) {
      this.addPontos(Math.floor(total));  // Adicionar 1 ponto por unidade monetária
    }
  }

  // Definir o ID do utilizador atual e carregar os seus dados
  setUserId(userId: string): void {
    this.userId = userId;
    this.loadPontos();          // Carregar pontos do utilizador
    this.carregarHistorico();   // Carregar histórico de compras
  }

  // Método auxiliar para obter a chave de armazenamento de pontos
  private getPontosKey(): string {
    return `userPontos_${this.userId}`;
  }

  // Método auxiliar para obter a chave de armazenamento do histórico
  private getHistoricoKey(): string {
    return `historicoCompras_${this.userId}`;
  }

  // Obter o valor total atual da compra
  getTotal(): number {
    return this.total;
  }

  // Obter o valor atual de pontos
  getPontos(): number {
    return this.pontosSubject.value;
  }

  // Definir o total temporário durante o checkout
  setPendingTotal(total: number) {
    this.pendingTotal = total;
  }

  // Obter o total pendente
  getPendingTotal(): number {
    return this.pendingTotal;
  }

  // Adicionar ou subtrair pontos do saldo do utilizador
  async addPontos(amount: number): Promise<void> {
    // Calcular novo total de pontos (nunca negativo)
    let newPontos = this.pontosSubject.value + amount;
    if (newPontos < 0) newPontos = 0;
    
    // Atualizar observable
    this.pontosSubject.next(newPontos);

    // Guardar no armazenamento apropriado
    const user = await this.authService.getCurrentUser();
    if (user && user.username) {
      // Utilizador autenticado - guardar via auth service
      await this.authService.updatePoints(newPontos);
    } else if (this.userId) {
      // Utilizador convidado - guardar no localStorage
      localStorage.setItem(this.getPontosKey(), newPontos.toString());
    }
  }

  // Adicionar uma nova compra ao histórico
  async adicionarCompraAoHistorico(
    valor: number,
    tipo: 'Os Nossos Ramos' | 'Personalizar Ramo' | 'Em Alta',
    descricao: string = ''
  ): Promise<void> {
    // Criar novo item de histórico
    const pontosGanhos = Math.floor(valor);  // 1 ponto por unidade monetária
    const novaCompra: HistoricoCompra = {
      id: Date.now().toString(),              // ID único baseado no timestamp
      data: new Date().toLocaleDateString('pt-PT'),  // Data atual no formato PT
      valor: valor,
      pontosGanhos: pontosGanhos,
      descricao: descricao || `Compra em ${tipo}`,  // Descrição padrão
      tipo: tipo
    };

    // Adicionar no início do array (mais recente primeiro)
    this.historicoCompras.unshift(novaCompra);
    
    // Guardar histórico atualizado
    await this.salvarHistorico();
  }

  // Obter o histórico completo de compras
  getHistoricoCompras(): HistoricoCompra[] {
    return this.historicoCompras;
  }

  // Guardar histórico no armazenamento persistente
  private async salvarHistorico(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (user && user.username) {
      // Utilizador autenticado - guardar com chave de username
      const historicoKey = `historicoCompras_${user.username}`;
      localStorage.setItem(historicoKey, JSON.stringify(this.historicoCompras));
    } else if (this.userId) {
      // Utilizador convidado - guardar com chave de userID
      localStorage.setItem(this.getHistoricoKey(), JSON.stringify(this.historicoCompras));
    }
  }

  // Carregar histórico do armazenamento persistente
  private carregarHistorico(): void {
    if (this.userId) {
      const historico = localStorage.getItem(this.getHistoricoKey());
      this.historicoCompras = historico ? JSON.parse(historico) : [];
    } else {
      this.historicoCompras = [];
    }
  }

  // Carregar pontos do armazenamento persistente
  loadPontos(): void {
    if (this.userId) {
      const saved = Number(localStorage.getItem(this.getPontosKey()));
      this.pontosSubject.next(!isNaN(saved) ? saved : 0);  // Lidar com caso NaN
    } else {
      this.pontosSubject.next(0);
    }
  }

  // Limpar dados do utilizador no logout
  logout(): void {
    this.userId = '';
    this.pontosSubject.next(0);
    this.historicoCompras = [];
    this.total = 0;
    this.pendingTotal = 0;
  }

  // Limpar todos os dados do serviço
  public limparDados(): void {
    this.pontosSubject.next(0);
    this.historicoCompras = [];
    this.total = 0;
    this.pendingTotal = 0;
  }
}