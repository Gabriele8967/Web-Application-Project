import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldsService } from '../services/fields/fields.service';
import { Field } from '../models/field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-total-booking',
  templateUrl: './total-booking.component.html',
  styleUrls: ['./total-booking.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Import CommonModule per usare i pipe come 'date'
})
export class TotalBookingComponent implements OnInit {
  date!: string;
  fieldId!: number;
  time!: number;
  campo!: Field;
  idGiocatore1: number | null = null;
  idGiocatore2: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: FieldsService,
    private router: Router // Aggiungi Router per la navigazione
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
    console.log('ID Giocatore 1:', this.idGiocatore1);
    console.log('ID Giocatore 2:', this.idGiocatore2);

    if (!this.idGiocatore1 || !this.idGiocatore2) {
      alert('Entrambi gli ID dei giocatori sono obbligatori.');
      return;
    }

    this.service.prenotaCampo(this.fieldId, this.time, this.date, this.idGiocatore1, this.idGiocatore2, 0).subscribe({
      next: (response) => {
        alert('Prenotazione completata con successo!');
        // Reindirizza alla pagina senza l'orario
        this.router.navigate([`/fields/${this.date}/${this.fieldId}`]);
      },
      error: (error) => {
        alert('Errore nella prenotazione: ' + error.message);
      }
    });
  }
}
