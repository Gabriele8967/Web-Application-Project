import {Component, OnInit} from '@angular/core';
import {Field} from '../models/field';
import {ActivatedRoute, Router} from '@angular/router';
import {FieldsService} from '../services/fields/fields.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-partial-matchmaking',
  imports: [CommonModule, FormsModule],
  templateUrl: './partial-matchmaking.component.html',
  standalone: true,
  styleUrl: './partial-matchmaking.component.css'
})
export class PartialMatchmakingComponent implements OnInit {
  date!: string;
  fieldId!: number;
  time!: number;
  campo!: Field;
  idGiocatore1: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: FieldsService,
    protected router: Router // Aggiungi Router per la navigazione
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
  prenota(): void {
    console.log('ID Giocatore 1:', this.idGiocatore1);

    if (!this.idGiocatore1) {
      alert('Inserire ID del giocatore');
      return;
    }

    this.service.prenotaCampo(this.fieldId, this.time, this.date, this.idGiocatore1, undefined, 1).subscribe({
      next: (response) => {
        alert('Prenotazione completata con successo!');
        // Naviga alla pagina precedente
        this.router.navigate([`/fields/${this.date}/${this.fieldId}`]);
      },
      error: (error) => {
        console.error('Errore durante la prenotazione:', error);
        alert('Errore nella prenotazione: ' + error.message);
      },
      complete: () => {
        console.log('Prenotazione gestita correttamente.');
      },
    });
  }
}



