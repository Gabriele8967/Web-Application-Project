import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Field } from '../models/field';
import { FieldsService } from '../services/fields/fields.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule]
})
export class FieldsComponent implements OnInit {
  fields: Field[] = [];
  hours: number[] = [17, 18, 19, 20];
  fieldStatus: { [key: number]: { [hour: number]: boolean } } = {};
  selectedDate: string = ''; // Data selezionata dall'utente

  constructor(private service: FieldsService, private router: Router) {}

  ngOnInit() {
    const defaultDate = new Date().toISOString().split('T')[0];
    this.loadFields(defaultDate);
  }

  loadFields(date: string) {
    this.service.getFields(date).subscribe((fields: Field[]) => {
      const uniqueFields = fields.filter(
        (campo, index, self) => index === self.findIndex((t) => t.id === campo.id)
      );

      uniqueFields.forEach((field) => {
        if (!this.fieldStatus[field.id]) {
          this.fieldStatus[field.id] = {};
        }
        this.hours.forEach((hour) => {
          const fieldAtHour = fields.find(
            (f) => f.id === field.id && f.time === hour
          );
          this.fieldStatus[field.id][hour] = fieldAtHour ? fieldAtHour.isOccupied : false;
        });
      });

      this.fields = uniqueFields;
    });
  }

  isTimeAvailableForField(field: Field, hour: number): boolean {
    const fieldTime = this.fields.find(
      (f) => f.id === field.id && f.time === hour
    );
    return fieldTime ? !fieldTime.isOccupied : true;
  }

  isFieldAvailable(field: Field): boolean {
    return this.hours.every((hour) => this.isTimeAvailableForField(field, hour));
  }

  getColor(field: Field, hour: number): string {
    return this.fieldStatus[field.id] && this.fieldStatus[field.id][hour]
      ? 'occupied'
      : 'available';
  }

  gestisciCampo(id: number): void {
    this.router.navigate([`/fields/${id}`]);
  }

  navigateToDate(): void {
    if (this.selectedDate) {
      this.router.navigate([`/fields/${this.selectedDate}`]);
    }
  }
}
