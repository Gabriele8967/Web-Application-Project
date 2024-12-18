import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Metodo per il logout
  logout(): void {
    localStorage.removeItem('token'); // Rimuovi il token dalla memoria locale
    sessionStorage.removeItem('token'); // Rimuovi il token dalla sessione, se utilizzato
  }

  // Metodo per verificare se l'utente è loggato
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }
}
