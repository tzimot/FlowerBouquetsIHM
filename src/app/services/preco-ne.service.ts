import { Injectable } from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class PrecoNEService {


  private precoValue: number = 0;

  setPrecoValue(value: number) {
    this.precoValue = value;
  }

  getPrecoValue() {
    return this.precoValue;
  }


  constructor() { }
}
