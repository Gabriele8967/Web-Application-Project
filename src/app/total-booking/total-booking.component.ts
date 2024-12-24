import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FieldsService } from '../services/fields/fields.service';
import { Field } from '../models/field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-total-booking',
  templateUrl: './total-booking.component.html',
  styleUrls: ['./total-booking.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule] // Import CommonModule per usare i pipe come 'date'
})
export class TotalBookingComponent implements OnInit {
  date!: string;
  fieldId!: number;
  time!: number;
  campo!: Field;
  idGiocatore1!: number;  // ID Giocatore 1
  idGiocatore2!: number;  // ID Giocatore 2

  constructor(
    private route: ActivatedRoute,
    private service: FieldsService
  ) {}

  ngOnInit(): void {
    // Recupera i parametri dalla route
    this.route.params.subscribe(params => {
      this.date = params['date'];
      this.fieldId = +params['id'];
      this.time = +params['time'];

      // Ottieni i dettagli del campo specifico
      // @ts-ignore
      this.service.getFieldById(this.date, this.fieldId).subscribe((fields: Field[]) => {
        this.campo = fields[0]; // Supponiamo che venga restituito un singolo campo
      });
    });
  }

  // Metodo per completare la prenotazione
  prenota(): void {
    if (!this.idGiocatore1 || !this.idGiocatore2) {
      alert('Entrambi gli ID dei giocatori sono obbligatori.');
      return;
    }

    // Invia i dati per completare la prenotazione
    this.service.prenotaCampo(this.fieldId, this.time, this.date, this.idGiocatore1, this.idGiocatore2, 0).subscribe({
      next: (response) => {
        alert('Prenotazione completata con successo!');
      },
      error: (error) => {
        alert('Errore nella prenotazione: ' + error.message);
      }
    });
  }
}
