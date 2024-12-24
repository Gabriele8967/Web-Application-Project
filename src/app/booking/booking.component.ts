import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldsService } from '../services/fields/fields.service';
import { Request } from '../models/request';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BookingComponent implements OnInit {
  idCampo!: number;
  orario!: number;
  date!: string;
  id_a!: number;  // ID Giocatore 1
  id_b?: number;  // ID Giocatore 2 o Maestro
  tipoprenotazione: number = 0; // Impostazione predefinita

  constructor(
    private service: FieldsService,
    private route: ActivatedRoute,
    private router: Router // Inietta il router
  ) {}

  ngOnInit(): void {
    const idCampoParam = this.route.snapshot.paramMap.get('id');
    const orarioParam = this.route.snapshot.paramMap.get('time');
    const dateParam = this.route.snapshot.paramMap.get('date');

    if (idCampoParam && orarioParam && dateParam) {
      this.idCampo = +idCampoParam;  // Converte la stringa in numero
      this.orario = +orarioParam;    // Converte la stringa in numero
      this.date = dateParam;         // Assegna la data direttamente
    } else {
      this.date = new Date().toISOString().split('T')[0]; // Data odierna come default
    }
  }

  // Funzione per reindirizzare alla pagina corretta in base al tipo di prenotazione
  goToBooking(tipo: string): void {
    // Verifica che idCampo, orario e date siano definiti
    if (this.idCampo && this.orario && this.date) {
      switch (tipo) {
        case 'total':
          this.router.navigate([`/fields/${this.date}/${this.idCampo}/${this.orario}/total`]);
          break;
        case 'partial':
          this.router.navigate([`/fields/${this.date}/${this.idCampo}/${this.orario}/partial`]);
          break;
        case 'lesson':
          this.router.navigate([`/fields/${this.date}/${this.idCampo}/${this.orario}/lesson`]);
          break;
        default:
          console.error('Tipo di prenotazione non valido');
      }
    } else {
      alert('ID Campo, Orario e Data devono essere validi!');
    }
  }
}
