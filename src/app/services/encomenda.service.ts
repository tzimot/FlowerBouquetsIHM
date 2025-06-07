import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {
  private total: number = 0;
  private pontosSubject = new BehaviorSubject<number>(0);
  private pendingTotal: number = 0; 
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
    let newPontos = this.pontosSubject.value + amount; // Add points
    if (newPontos < 0) newPontos = 0;  // Ensure points do not go negative
    this.pontosSubject.next(newPontos);
    localStorage.setItem('userPontos', newPontos.toString());
  }

  loadPontos(): void {
    const saved = Number(localStorage.getItem('userPontos'));
    if (!isNaN(saved)) {
      this.pontosSubject.next(saved);
    }
  }

  constructor() {
    this.loadPontos();
  }
}