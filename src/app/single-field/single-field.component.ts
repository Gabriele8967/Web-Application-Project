import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Field } from '../models/field';
import { FieldsService } from '../services/fields/fields.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.css'],
  standalone: true,
  imports: [CommonModule]  // Aggiungi CommonModule
})
export class SingleFieldComponent implements OnInit {
  field: Field[] = []; // Modificato da 'Field | undefined' a 'Field[]'

  constructor(
    private service: FieldsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    // @ts-ignore
    this.service.getFieldById(id).subscribe((fields: Field[]) => {
      this.field = fields;
    });
  }
  prenotaCampo(campo: any): void {
    if (!campo.isOccupied) {
      // Chiamata al servizio per prenotare il campo
      this.service.prenotaCampo(campo.id, campo.time, campo).subscribe(updatedCampo => {
        campo.isOccupied = true;
        campo.idGiocatore1 = updatedCampo.idGiocatore1;
        campo.idGiocatore2 = updatedCampo.idGiocatore2;
        campo.idMaestro = updatedCampo.idMaestro;
      });
    }
  }

  // Metodo per eliminare la prenotazione
  eliminaPrenotazione(campo: any): void {
    if (campo.isOccupied) {
      // Chiamata al servizio per eliminare la prenotazione
      this.service.updateCampoOccupato(campo.id, campo.time, false).subscribe(updatedCampo => {
        campo.isOccupied = false;
        campo.idGiocatore1 = null;
        campo.idGiocatore2 = null;
        campo.idMaestro = null;
      });
    }
  }
}
