import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { FormsModule } from '@angular/forms';    // Importa FormsModule
import { FieldsService } from '../services/fields/fields.service';
import {Request} from '../models/request';

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
  date!: string;
  id_a!: number;
  id_b?: number;
  tipoprenotazione!: number;

  constructor(private route: ActivatedRoute, private service: FieldsService) {}

  ngOnInit(): void {
    const idCampoParam = this.route.snapshot.paramMap.get('id');
    const orarioParam = this.route.snapshot.paramMap.get('time');
    const dateParam = this.route.snapshot.paramMap.get('date');

    if (idCampoParam && orarioParam && dateParam) {
      this.idCampo = +idCampoParam;  // Converte la stringa in numero
      this.orario = +orarioParam;    // Converte la stringa in numero
      this.date = dateParam;
    }
  }

  prenota(): void {
    console.log(`Prenotazione per il campo ${this.idCampo} all'orario ${this.orario}`);
    this.service.prenotaCampo(this.idCampo, this.orario, this.date, this.id_a, this.id_b, this.tipoprenotazione).subscribe({
      next: (response: Request) => {
        alert(response.messaggio);
      },
      error: (error) => {
        alert(`Errore nella comunicazione con il backend: ${error.message}`);
      }
    });
  }
}
