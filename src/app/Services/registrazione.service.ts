import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrazioneService {

  private apiUrl = 'http://localhost:8080/api/registrazione';
  constructor(private http: HttpClient) { }

  registrati(nuovoGiocatore: any): Observable<string> {
    return this.http.post<string>(this.apiUrl, nuovoGiocatore, { responseType: 'text' as 'json' });
  }

}
