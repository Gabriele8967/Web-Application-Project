import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8080/api/users';  // URL del tuo backend

  constructor(private http: HttpClient) { }

  // Metodo per ottenere tutti gli utenti
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);  // Chiamata per ottenere tutti gli utenti
  }
}