import { Component, OnInit } from '@angular/core'; // Importa os módulos necessários para definir um componente
import { Router } from '@angular/router'; // Importa o serviço de navegação entre páginas

@Component({
  selector: 'app-cancelar', // Define o seletor HTML do componente
  templateUrl: './cancelar.page.html', // Caminho para o ficheiro HTML associado ao componente
  styleUrls: ['./cancelar.page.scss'], // Caminho para o ficheiro de estilos associado ao componente
})
export class CancelarPage implements OnInit { // Declara a classe do componente e implementa o OnInit

  constructor(private router: Router) { } // Injeta o serviço Router para permitir navegação programática

  ngOnInit() { // Método chamado quando o componente é inicializado
  }

  redirectToInicio() { // Função que navega para a página inicial
    this.router.navigate(['/home']); // Navega para a rota '/home'
  }

}