import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cards: any[] = [];
  card: any;
  number: any;
  date: any = new Date();

  constructor(private http: HttpClient, private _date: DatePipe) {}

  ngOnInit() {
    this.http.get('assets/data-structure.json').subscribe((data: any) => {
      this.cards = data.cards;
    });
  }

  generateLink() {
    if (!this.number || !this.card) {
      return;
    }

    const baseUrl = 'https://wa.me/34';
    var date4month : any = new Date(this.date);
    date4month.setMonth(date4month.getMonth()+4)
    const message = `*Territorios Congregación Parque*\n${this.card.type}\n*${this.card.number}* (${this._date.transform(this.date, 'dd/MM/yyyy')} - ${this._date.transform(date4month, 'dd/MM/yyyy')}) \n📍 Mapa: ${this.card.url} \n *NOTA:* Los límites del territorio coinciden con caminos o carreteras. La predicación debe realizarse dentro del margen interior.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `${baseUrl}${this.number}?text=${encodedMessage}`;
    
    window.open(whatsappLink, '_blank');
  }

}
