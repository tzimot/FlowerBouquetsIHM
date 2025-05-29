import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PrecoService } from 'src/app/services/preco.service';





interface ImageData {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
}



@Component({
  selector: 'app-personalizar-ramo',
  templateUrl: './personalizar-ramo.page.html',
  styleUrls: ['./personalizar-ramo.page.scss'],
})
export class PersonalizarRamoPage implements OnInit {
  public images: ImageData[];
  public totalSum: number;
  filteredImages: ImageData[] = [];
  
  
  
  constructor(private router: Router, private alertController: AlertController, private precoService: PrecoService) { 
    this.images = [];
    this.totalSum = 0;
  }

  ngOnInit() {
    fetch('./assets/imgsData/imagens.json')
    .then(res => res.json())
    .then(json => {
      this.images = json;
      this.calculateTotalSum();
      this.precoService.setPrecoValue(this.totalSum); // Set the calculated price in the PrecoService

      this.filteredImages = this.images;
    });
  }


  decreaseQuantity(image: ImageData) {
    if (image.quantity && image.quantity > 0) {
      image.quantity--;
      this.calculateTotalSum();
    }
  }
  
  increaseQuantity(image: ImageData) {
    if (image.quantity) {
      image.quantity++;
      this.calculateTotalSum();
    } else {
      image.quantity = 1;
      this.calculateTotalSum();
    }
  }

  calculateTotalSum() {
    this.totalSum = this.images.reduce(
      (sum, image) => sum + (image.quantity || 0) * (image.price || 0),
      0
    );
  }

  goToPersonalizarUmPage() {
    if (this.totalSum === 0) {
      this.showAlert('Por favor, selecione algo para prosseguir.', '');
    } else {
      this.precoService.setPrecoValue(this.totalSum); // Set the calculated price in the PrecoService
      this.router.navigate(['/personalizar-um']);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }




  searchFlowers(event: any) {
    const searchQuery = event.target.value;
    // Filter the images based on the search query
    this.filteredImages = this.images.filter((image) =>
      image.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  

}
