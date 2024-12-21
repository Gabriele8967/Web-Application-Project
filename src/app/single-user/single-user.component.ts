import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { UsersService } from '../services/users/users.service';
import { Users } from '../models/users';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Request} from '../models/request';

@Component({
  selector: 'app-users',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink] // Aggiungi CommonModule qui
})

export class SingleUserComponent implements OnInit {
  user: Users | undefined;  // Usa un singolo oggetto Users anziché un array

  constructor(
    private service: UsersService,  // Inietta il servizio UsersService
    private route: ActivatedRoute,   // Inietta ActivatedRoute per ottenere l'ID dalla rotta
    private router: Router
  ) {}

  ngOnInit() {
    // Ottieni l'ID dalla rotta e usa getUserById per ottenere i dettagli dell'utente
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');  // Usa l'ID della rotta
    this.service.getUserById(id).subscribe((user: Users) => {
      this.user = user;  // Assegna i dettagli dell'utente alla variabile user
    });
  }

  banUser(id: number): void {
    this.service.banUser(id).subscribe({
      next: (response: Request) => {
        // Mostra un messaggio di alert in base al risultato del backend
        if (response.esito) {
          alert(`Successo: ${response.messaggio}`);
        } else {
          alert(`Errore: ${response.messaggio}`);
        }
        // Aggiorna la lista degli utenti solo se il ban è stato effettuato con successo
        if (response.esito) {
          this.router.navigate([`/users`]);
          this.ngOnInit();
        }
      },
      error: (error) => {
        // Gestione errori in caso di problemi nella comunicazione HTTP
        alert(`Errore nella comunicazione con il backend: ${error.message}`);
      }
    });
  }

  unbanUser(id: number): void {
    this.service.unbanUser(id).subscribe({
      next: (response: Request) => {
        // Mostra un messaggio di alert in base al risultato del backend
        if (response.esito) {
          alert(`Successo: ${response.messaggio}`);
        } else {
          alert(`Errore: ${response.messaggio}`);
        }
        // Aggiorna la lista degli utenti solo se il ban è stato effettuato con successo
        if (response.esito) {
          this.router.navigate([`/users`]);
          this.ngOnInit();
        }
      },
      error: (error) => {
        // Gestione errori in caso di problemi nella comunicazione HTTP
        alert(`Errore nella comunicazione con il backend: ${error.message}`);
      }
    });
  }
}
