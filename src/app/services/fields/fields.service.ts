import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from '../../models/field';
import {Users} from '../../models/users';

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

  // Aggiornare stato di occupazione
  updateCampoOccupato(id: number, time: number, isOccupied: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}/${time}`, { isOccupied });
  }
}
