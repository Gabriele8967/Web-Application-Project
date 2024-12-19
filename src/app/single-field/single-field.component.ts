import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { Router } from '@angular/router';
import { Field } from '../models/field';
import { FieldsService } from '../services/fields/fields.service';

@Component({
  selector: 'app-single-field',
  imports: [CommonModule],  // Aggiungi CommonModule qui
  templateUrl: './single-field.component.html',
  standalone: true,
  styleUrls: ['./single-field.component.css']
})
export class SingleFieldComponent implements OnInit {
  campo: Field | null = null;

  constructor(private service: FieldsService, private router: Router) {}

  ngOnInit(): void {
    const id = this.router.url.split('/').pop();  // ottieni id dalla URL
    if (id) {
      this.service.getCampoById(+id).subscribe((campo) => {
        this.campo = campo;
      });
    }
  }
}
