import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users/users.service';
import { Users } from '../models/users';
import { Router, RouterLink } from '@angular/router';

interface ClickState {
  direction: 'asc' | 'desc' | '';
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
  sortedUsers: Users[] = [];

  clickState: Record<string, ClickState> = {
    nome: { direction: '' },
    cognome: { direction: '' },
    livello: { direction: '' },
    bannato: { direction: '' },
    id: { direction: '' }, // Stato per ID
  };

  constructor(private service: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      (users: Users[]) => {
        this.users = users;
        this.sortedUsers = [...users];
      },
      (error) => {
        console.error('Errore durante il recupero degli utenti:', error);
      }
    );
  }

  getButtonText(criterio: string): string {
    const state = this.clickState[criterio];
    let text = criterio.charAt(0).toUpperCase() + criterio.slice(1);

    if (state.direction) {
      text += state.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return text;
  }

  sortUsers(criterio: string): void {
    const state = this.clickState[criterio];

    // Se il criterio selezionato non è già quello corrente, resetta l'ordinamento
    if (state.direction === '' || state.direction === 'desc') {
      state.direction = 'asc';  // Cambia in crescente
    } else {
      state.direction = 'desc';  // Cambia in decrescente
    }

    this.resetOtherButtons(criterio);
    this.sortDirection(criterio, state.direction);
  }

  sortDirection(criterio: string, direction: 'asc' | 'desc' | ''): void {
    const compareFn = (a: any, b: any): number => {
      if (direction === 'asc') return a < b ? -1 : a > b ? 1 : 0;
      if (direction === 'desc') return a < b ? 1 : a > b ? -1 : 0;
      return 0;
    };

    switch (criterio) {
      case 'nome':
        this.sortedUsers.sort((a, b) => compareFn(a.nome, b.nome));
        break;
      case 'cognome':
        this.sortedUsers.sort((a, b) => compareFn(a.cognome, b.cognome));
        break;
      case 'livello':
        this.sortedUsers.sort((a, b) => compareFn(a.livello, b.livello));
        break;
      case 'bannato':
        this.sortedUsers.sort((a, b) => compareFn(a.bannato ? 1 : 0, b.bannato ? 1 : 0));
        break;
      case 'id': // Ordinamento per ID
        this.sortedUsers.sort((a, b) => compareFn(a.id, b.id));
        break;
    }
  }

  resetOtherButtons(criterio: string): void {
    Object.keys(this.clickState).forEach((key) => {
      if (key !== criterio) {
        this.clickState[key].direction = ''; // Resetta la direzione di altri pulsanti
      }
    });
  }

  gestisciUtente(id: number): void {
    this.router.navigate([`/users/${id}`]);
  }
}
