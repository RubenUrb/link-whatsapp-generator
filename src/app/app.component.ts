import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cards: any[] = [];
  card: any;
  number: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/assets/data-structure.json').subscribe((data: any) => {
      this.cards = data.cards;
    });
  }

  generateLink() {
    if (!this.number || !this.card) {
      return;
    }

    const baseUrl = 'https://wa.me/34';
    const message = `Hola, aquí tienes tu territorio asignado. 📍 Mapa: ${this.card.description}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `${baseUrl}${this.number}?text=${encodedMessage}`;
    
    window.open(whatsappLink, '_blank');
  }

}
