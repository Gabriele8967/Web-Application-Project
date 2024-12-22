import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { FormsModule } from '@angular/forms';    // Importa FormsModule

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]  // Aggiungi FormsModule per ngModel
})
export class BookingComponent implements OnInit {
  idCampo!: number;
  orario!: number;
  idGiocatore1!: number;
  idGiocatore2!: number;
  idMaestro?: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idCampoParam = this.route.snapshot.paramMap.get('id');
    const orarioParam = this.route.snapshot.paramMap.get('time');

    if (idCampoParam && orarioParam) {
      this.idCampo = +idCampoParam;  // Converte la stringa in numero
      this.orario = +orarioParam;    // Converte la stringa in numero
    }
  }

  prenota(): void {
    console.log(`Prenotazione per il campo ${this.idCampo} all'orario ${this.orario}`);
    // Aggiungi qui la logica di prenotazione
  }
}
