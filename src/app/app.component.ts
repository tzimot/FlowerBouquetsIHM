import { Component } from '@angular/core';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Recomendados', url: '/nova-encomenda', icon: 'paper-plane' },
    { title: 'Personalizar Ramo', url: '/personalizar-ramo', icon: 'heart' },
    { title: 'Mais Vendidos', url: '/top-vendas', icon: 'archive' },
    
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
    //this.initializeApp();
  }

  //initializeApp() {
    //ScreenOrientation.lock(ScreenOrientation.orientation.portrait);
  //}
}
