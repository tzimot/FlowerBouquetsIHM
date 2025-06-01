import { Component, OnInit } from '@angular/core'; // Importa os módulos necessários do Angular
import { Router } from '@angular/router'; // Importa o Router para navegação entre páginas

@Component({
  selector: 'app-obrigado', // Define o seletor do componente
  templateUrl: './obrigado.page.html', // Caminho para o ficheiro HTML associado
  styleUrls: ['./obrigado.page.scss'], // Caminho para o ficheiro SCSS associado
})
export class ObrigadoPage implements OnInit { // Define a classe do componente e implementa OnInit

  constructor(private router: Router) { } // Injeta o serviço Router no construtor

  ngOnInit() { // Método que é chamado quando o componente é inicializado
  }

  redirectToInicio() { // Função chamada para redirecionar para a página inicial
    this.router.navigate(['/home']); // Navega até à rota '/home'
  }

}
