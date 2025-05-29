import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




export interface ImageData {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
}



@Injectable({
  providedIn: 'root'
})
export class FloresService {
  private apiUrl = './assets/imgsData/imagens.json';

  constructor(private http: HttpClient) {}

  getFlowers(): Observable<ImageData[]> {
    return this.http.get<ImageData[]>(this.apiUrl);
  }

  getTopVendas(): Observable<ImageData[]> {
    return this.getFlowers().pipe(
      map(flowers => flowers.filter(flower => [7, 8, 9].includes(flower.id)))
    );
  }


  

  


}
