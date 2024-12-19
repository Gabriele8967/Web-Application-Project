import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from '../../models/field';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  private apiUrl = 'http://localhost:8080/api/fields';  // URL del backend

  constructor(private http: HttpClient) { }

  // Metodo per ottenere tutti i campi
  getFields(): Observable<Field[]> {
    return this.http.get<Field[]>(`${this.apiUrl}`);
  }

  // Metodo per ottenere un campo specifico per ID
  getCampoById(id: number): Observable<Field> {
    return this.http.get<Field>(`${this.apiUrl}/${id}`);
  }
}
