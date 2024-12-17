import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {Field} from '../models/field';
import {FormBuilder} from '@angular/forms';
import {FieldsService} from '../services/fields/fields.service';

@Component({
  selector: 'app-book-field',
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './book-field.component.html',
  standalone: true,
  styleUrl: './book-field.component.css'
})
export class BookFieldComponent {
  campi: Field[] = [];

  constructor(private service: FieldsService) {}
  ngOnInit() {
    this.service.getFields().subscribe((fields: Field[]) => {
      this.campi = fields;
      alert(fields[0].image)
    })
  }
}
