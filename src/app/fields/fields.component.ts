import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

import {Router, RouterLink} from '@angular/router';
import {Field} from '../models/field';
import {FieldsService} from '../services/fields/fields.service';


@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink] // Aggiungi CommonModule qui
})
export class FieldsComponent implements OnInit {
  fields: Field[] = [];
  hours: number[] = [17, 18, 19, 20]
  fieldStatus: { [key: number]: { [hour: number]: boolean } } = {};

  constructor(private service: FieldsService, private router: Router) {}

  ngOnInit() {
    this.service.getFields().subscribe((fields: Field[]) => {
      // Filtra i duplicati in base all'ID del campo
      const uniqueFields = fields.filter((campo, index, self) =>
        index === self.findIndex((t) => t.id === campo.id)
      );

      // Popola la variabile fieldStatus con gli orari e lo stato di occupazione
      uniqueFields.forEach((field) => {
        if (!this.fieldStatus[field.id]) {
          this.fieldStatus[field.id] = {};
        }
        this.hours.forEach((hour) => {
          const fieldAtHour = fields.find(
            (f) => f.id === field.id && f.time === hour
          );
          if (fieldAtHour) {
            this.fieldStatus[field.id][hour] = fieldAtHour.isOccupied;
          } else {
            this.fieldStatus[field.id][hour] = false; // Se non c'è, consideriamo l'orario come disponibile
          }
        });
      });

      this.fields = uniqueFields; // Assegna i campi filtrati alla variabile fields
    });
  }

  // Funzione per determinare se un orario specifico per un campo è disponibile
  isTimeAvailableForField(field: Field, hour: number): boolean {
    // Trova il campo con lo stesso id e ora specificata
    const fieldTime = this.fields.filter(
      (f) => f.id === field.id && f.time === hour
    )[0]; // Restituisce il primo elemento che corrisponde

    // Se fieldTime è definito, ritorna true solo se non è occupato
    return fieldTime ? !fieldTime.isOccupied : true; // Considera l'orario disponibile se non trovato
  }

  // Funzione per determinare se un campo è disponibile in tutti gli orari
  isFieldAvailable(field: Field): boolean {
    return this.hours.every((hour) => this.isTimeAvailableForField(field, hour));
  }

  // Funzione per determinare il colore dell'orario in base alla disponibilità
  getColor(field: Field, hour: number): string {
    return this.fieldStatus[field.id] && this.fieldStatus[field.id][hour]
      ? 'occupied'
      : 'available';
  }

  gestisciCampo(id: number): void {
    this.router.navigate([`/fields/${id}`]);
  }
}
