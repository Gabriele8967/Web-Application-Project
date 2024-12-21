import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Abilita} from '../Model/abilita';

@Injectable({
  providedIn: 'root'
})

export class AbilitaService {
  private url : string = "http://localhost:8080/api";

  constructor(public http: HttpClient) {}

  getAbilita(idGiocatore: number): Observable<Abilita> {
    return this.http.get<Abilita>(this.url + "/abilita?id=" + idGiocatore);
  }
}
