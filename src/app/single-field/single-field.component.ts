import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router'; // Import Router
import { Field } from '../models/field';
import { FieldsService } from '../services/fields/fields.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class SingleFieldComponent implements OnInit {
  field: Field[] = [];

  constructor(
    private service: FieldsService,
    private route: ActivatedRoute,
    private router: Router // Inietta il router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    // @ts-ignore
    this.service.getFieldById(id).subscribe((fields: Field[]) => {
      this.field = fields;
    });
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

  goToBookingPage(campo: Field): void {
    this.router.navigate(['/fields', campo.id, campo.time]); // Naviga alla pagina di prenotazione
  }
}


