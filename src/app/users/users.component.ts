import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users/users.service';
import { Users } from '../models/users';
import { Router, RouterLink } from '@angular/router';

interface ClickState {
  count: number;
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
    nome: { count: 0, direction: '' },
    cognome: { count: 0, direction: '' },
    livello: { count: 0, direction: '' },
    bannato: { count: 0, direction: '' },
    id: { count: 0, direction: '' }, // Aggiunto stato per ID
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

    if (state.count > 0) {
      text += ` ${state.direction === 'asc' ? '↑' : '↓'}`;
    }
    return text;
  }

  sortUsers(criterio: string): void {
    this.resetOtherButtons(criterio);

    const state = this.clickState[criterio];
    state.count = (state.count + 1) % 3;

    state.direction = state.count === 1 ? 'asc' : state.count === 2 ? 'desc' : '';

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
        this.clickState[key].count = 0;
        this.clickState[key].direction = '';
      }
    });
  }

  gestisciUtente(id: number): void {
    this.router.navigate([`/users/${id}`]);
  }
}
