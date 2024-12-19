import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from '../../models/field';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private http: HttpClient) { }

  // Metodo per ottenere i campi
  getFields(): Observable<Field[]> {
    return this.http.get<Field[]>("http://localhost:8080/api/book-field");
  }



}
