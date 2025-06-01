import { Component, OnInit } from '@angular/core'; // Importa para criar componente Angular e usar OnInit

@Component({
  selector: 'app-finalizar-um', // Define o seletor do componente no HTML
  templateUrl: './finalizar-um.page.html', // Ficheiro HTML do componente
  styleUrls: ['./finalizar-um.page.scss'], // Ficheiro de estilos CSS/SCSS do componente
})
export class FinalizarUmPage implements OnInit { // Declara a classe do componente e implementa OnInit

  constructor() { } // Construtor vazio, usado para injeções se necessário

  ngOnInit() { // Método chamado na inicialização do componente
  }

}
