import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldsService } from '../services/fields/fields.service';
import { Field } from '../models/field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-booking',
  templateUrl: './lesson-booking.component.html',
  styleUrls: ['./lesson-booking.component.css'],
  standalone: true,
  imports: [FormsModule] // Importiamo FormsModule per ngModel
})
export class LessonBookingComponent implements OnInit {
  date!: string;
  fieldId!: number;
  time!: number;
  campo!: Field;
  idGiocatore1!: number; // ID Giocatore 1
  idMaestro!: number; // ID Maestro

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

  // Metodo per prenotare la lezione
  prenotaLezione(): void {
    if (!this.idGiocatore1 || !this.idMaestro) {
      alert('ID Giocatore 1 e ID Maestro sono obbligatori.');
      return;
    }

    // Invia i dati per la prenotazione
    this.service.prenotaCampo(this.fieldId, this.time, this.date, this.idGiocatore1, this.idMaestro, 3).subscribe({
      next: (response) => {
        alert(response.messaggio);
        if(response.esito) {
          this.router.navigate([`/fields/${this.date}/${this.fieldId}`]);  // Reindirizza alla home o alla pagina desiderata
        }
      },
      error: (error) => {
        alert('Errore nella prenotazione della lezione: ' + error.message);
      }
    });
  }
}
