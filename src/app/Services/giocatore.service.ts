import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Giocatore} from '../Model/giocatore';
import {Abilita} from '../Model/abilita';

@Injectable({
  providedIn: 'root'
})

export class GiocatoreService {

  private url : string = "http://localhost:8080/api";

  constructor(public http:HttpClient) {}

  getGiocatori(): Observable<Giocatore[]>{
    return this.http.get<Giocatore[]>(this.url + "/giocatori");
  }

  getDatiGiocatore(idGiocatore: number): Observable<Giocatore>{
    return this.http.get<Giocatore>(this.url + "/giocatori/" + idGiocatore);
  }
  recuperaPass(email: string): Observable<any> {
    return this.http.post(this.url+'/recupero', email, { responseType: 'text' }  );

  }


}