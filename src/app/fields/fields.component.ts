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

  constructor(private service: FieldsService, private router: Router) {}

  ngOnInit() {
    this.service.getFields().subscribe((fields: Field[]) => {
      // Filtra i duplicati in base all'ID del campo
      this.fields = fields.filter((campo, index, self) =>
          index === self.findIndex((t) => (
            t.id === campo.id
          ))
      );
    });
  }

  gestisciCampo(id: number): void {
    this.router.navigate([`/fields/${id}`]); // Naviga alla pagina del campo
  }
}
