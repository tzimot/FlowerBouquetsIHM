import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {
  private total: number = 0;

  setTotal(total: number): void {
    this.total = total;
  }

  getTotal(): number {
    return this.total;
  }

  constructor() { }
}
