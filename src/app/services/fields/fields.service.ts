import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
  getFields(date: string): Observable<Field[]> {
    return this.http.get<Field[]>(`${this.apiUrl}/${date}`);
  }

  // Metodo per ottenere un campo specifico per ID
  getFieldById(date: string, id: number): Observable<Field> {
    return this.http.get<Field>(`${this.apiUrl}/${date}/${id}`);
  }

  prenotaCampo(id: number, time: number, date: string, id_a: number, id_b: number | undefined, tipoprenotazione: number): Observable<any> {
    if (id_b === undefined) {
      id_b = 0;
    }

    const params = new HttpParams()
      .set('id', id.toString())
      .set('date', date)
      .set('time', time.toString())
      .set('id_a', id_a.toString())
      .set('id_b', id_b.toString())
      .set('tipoprenotazione', tipoprenotazione.toString());

    console.log('Parametri inviati al backend:', params.toString());

    return this.http.get<Request>(`${this.apiUrl}/prenota`, { params });
  }



  prenotaLezione(fieldId: number, time: number, date: string, idGiocatore1: number, idMaestro: number): Observable<any> {
    const body = {
      fieldId,
      time,
      date,
      idGiocatore1,
      idMaestro
    };
    return this.http.post(`${this.apiUrl}/prenotazione/lezione`, body);
  }
  addPlayer2(idCampo: number, date: string, time: number, idGiocatore2: number): Observable<any> {
    const url = `${this.apiUrl}/prenotazioni/${idCampo}/${date}/${time}/aggiungi-giocatore2`;
    return this.http.put(url, { idGiocatore2 });
  }

  // Elimina una prenotazione dal database
  eliminaPrenotazione(id: number, date: string, orario: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/update/${id}/${date}/${orario}`);
  }
}
