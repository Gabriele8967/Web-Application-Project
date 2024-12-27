import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router'; // Import Router
import { Field } from '../models/field';
import { FieldsService } from '../services/fields/fields.service';
import { CommonModule } from '@angular/common';
import {Request} from '../models/request';

@Component({
  selector: 'app-single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class SingleFieldComponent implements OnInit {
  field: Field[] = [];
  dateFromUrl: string = '';

  constructor(
    private service: FieldsService,
    private route: ActivatedRoute,
    private router: Router // Inietta il router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const date = this.route.snapshot.paramMap.get('date');
    if (!id || !date) {
      alert('Parametri mancanti nell\'URL');
      this.router.navigate(['/']); // Torna alla home o ad una pagina di fallback
      return;
    }
    this.dateFromUrl = date;
    // @ts-ignore
    this.service.getFieldById(date, id).subscribe((fields: Field[]) => {
      this.field = fields;
    });
  }
  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  gestisciPartita(campo: Field): void {
    this.router.navigate(
      [`/fields/${campo.date}/${campo.id}/${campo.time}/partial`],
      { state: { campo } }
    );
  }

  eliminaPrenotazione(id: number, date: string, time: number): void {
    this.service.eliminaPrenotazione(id, date, time).subscribe({
      next: (response: Request) => {
        alert(response.messaggio);
        if (response.esito) {
          this.ngOnInit();
        }
      },
      error: (error) => {
        alert(`Errore nella comunicazione con il backend: ${error.message}`);
      }
    });
  }

  goToBookingPage(campo: Field): void {
    const date = this.route.snapshot.paramMap.get('date');
    this.router.navigate(['/fields', date, campo.id, campo.time]);
  }
}
