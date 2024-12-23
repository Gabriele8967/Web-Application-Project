import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrariDisponibili} from '../Model/orariDisponibili';

@Injectable({
  providedIn: 'root'
})

export class DisponibilitaService {
  private url : string = "http://localhost:8080/api";

  constructor(public http: HttpClient) {}

  //servizio per caricare gli orari disponibli dei campi
  getDisponibilita(): Observable<OrariDisponibili[]> {
    return this.http.get<OrariDisponibili[]>(this.url + "/disponibilita");
  }

  //servizio per caricare le prenotazioni delle partite in attesa di match


}
