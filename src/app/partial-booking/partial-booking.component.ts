import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldsService } from '../services/fields/fields.service';
import { Field } from '../models/field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-partial-booking',
  templateUrl: './partial-booking.component.html',
  styleUrls: ['./partial-booking.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Import CommonModule per usare i pipe come 'date'
})
export class PartialBookingComponent implements OnInit {
  date!: string;
  fieldId!: number;
  time!: number;
  campo!: Field;
  idGiocatore2!: number; // Per aggiungere il secondo giocatore

  constructor(
    private route: ActivatedRoute,
    private service: FieldsService,
    private router: Router
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

  // Metodo per aggiungere Giocatore 2 o fare altre operazioni di prenotazione
  aggiornaPrenotazione(): void {
    // Logica per aggiornare la prenotazione, ad esempio aggiungere il secondo giocatore
    if (this.idGiocatore2) {
      this.service.prenotaCampo(this.fieldId, this.time, this.date, this.idGiocatore2, undefined, 2).subscribe({
        next: (response) => {
          alert(response.messaggio);
          if (response.esito) {
            // Naviga alla pagina del campo dopo l'aggiornamento della prenotazione
            this.router.navigate([`/fields/${this.date}/${this.fieldId}`]);
          }
        },
        error: (error) => {
          alert('Errore nell\'aggiungere il Giocatore 2: ' + error.message);
        }
      });
    } else {
      alert('Devi inserire l\'ID del secondo giocatore.');
    }
  }
}
