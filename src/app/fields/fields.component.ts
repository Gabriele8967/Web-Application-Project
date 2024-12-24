import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Field } from '../models/field';
import { FieldsService } from '../services/fields/fields.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule]
})
export class FieldsComponent implements OnInit {
  fields: Field[] = [];
  hours: number[] = [17, 18, 19, 20]; // Orari disponibili
  fieldStatus: { [key: number]: { [hour: number]: boolean } } = {}; // Stato di ogni orario per campo
  selectedDate: string = ''; // Data selezionata dall'utente

  constructor(private service: FieldsService, private router: Router) {}

  ngOnInit() {
    const defaultDate = new Date().toISOString().split('T')[0]; // Data di default (oggi)
    this.selectedDate = defaultDate;
    this.loadFields(defaultDate); // Carica i campi per la data di default
  }

  // Metodo per caricare i campi dalla data selezionata
  loadFields(date: string) {
    this.service.getFields(date).subscribe((fields: Field[]) => {
      const uniqueFields = fields.filter(
        (campo, index, self) => index === self.findIndex((t) => t.id === campo.id)
      );

      // Aggiorna lo stato per ogni campo e orario
      uniqueFields.forEach((field) => {
        if (!this.fieldStatus[field.id]) {
          this.fieldStatus[field.id] = {};
        }
        this.hours.forEach((hour) => {
          const fieldAtHour = fields.find(
            (f) => f.id === field.id && f.time === hour
          );
          this.fieldStatus[field.id][hour] = fieldAtHour ? fieldAtHour.isOccupied : false; // Aggiorna stato orario
        });
      });

      this.fields = uniqueFields; // Assegna i campi alla variabile fields
    });
  }

  // Controlla se un orario specifico è disponibile per un campo
  isTimeAvailableForField(field: Field, hour: number): boolean {
    return this.fieldStatus[field.id] && !this.fieldStatus[field.id][hour]; // Se occupato, restituisce false
  }

  // Verifica se tutti gli orari di un campo sono liberi
  isFieldAvailable(field: Field, hours: number[]): boolean {
    return this.hours.every((hour) => this.isTimeAvailableForField(field, hour));
  }

  // Restituisce la classe CSS per il colore dell'orario
  getColor(field: Field, hour: number): string {
    return this.isTimeAvailableForField(field, hour) ? 'available' : 'occupied'; // Applica 'available' o 'occupied' in base alla disponibilità
  }

  // Gestisce il campo, navigando alla pagina di gestione
  gestisciCampo(id: number): void {
    this.router.navigate([`/fields/${this.selectedDate}/${id}`]); // Naviga alla pagina del campo selezionato
  }

  // Naviga alla data selezionata
  navigateToDate(): void {
    if (this.selectedDate) {
      this.loadFields(this.selectedDate); // Ricarica i campi per la data selezionata
      this.router.navigate([`/fields/${this.selectedDate}`]); // Naviga alla data selezionata
    }
  }
}
