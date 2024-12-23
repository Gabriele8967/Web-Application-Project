import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from '../../models/field';
import { Request } from '../../models/request';

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
  getFieldById(id: number): Observable<Field> {
    return this.http.get<Field>(`${this.apiUrl}/${id}`);
  }

  prenotaCampo(id: number, time: number, campo: any, idGiocatore2: number, idMaestro: number | undefined): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prenota`, campo);
  }

  // Elimina una prenotazione dal database
  eliminaPrenotazione(id: number, date: string, orario: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/update/${id}/${date}/${orario}`);
  }
}
