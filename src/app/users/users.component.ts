import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users/users.service';
import { Users } from '../models/users';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})

export class UsersComponent implements OnInit {
  users: Users[] = [];
  sortedUsers: Users[] = [];

  // Variabili per tracciare i clic sui pulsanti e lo stato
  clickState = {
    nome: { count: 0, direction: '' },
    cognome: { count: 0, direction: '' },
    livello: { count: 0, direction: '' },
    bannato: { count: 0, direction: '' }
  };

  constructor(private service: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe((users: Users[]) => {
      this.users = users;
      this.sortedUsers = [...users];
    });
  }

  // Metodo per determinare il testo del pulsante e la direzione della freccia
  getButtonText(criterio: string): string {
    // @ts-ignore
    const state = this.clickState[criterio];
    let text = criterio.charAt(0).toUpperCase() + criterio.slice(1); // Capitalizza il nome del criterio

    if (state.count > 0) {
      // Aggiungi la freccia in base alla direzione
      text += ` ${state.direction === 'asc' ? '↑' : '↓'}`;
    }

    return text;
  }

  // Metodo per ordinare e gestire i clic
  sortUsers(criterio: string): void {
    // Reset dello stato di tutti i pulsanti tranne quello cliccato
    this.resetOtherButtons(criterio);

    // Cambia il conteggio dei clic e la direzione
    // @ts-ignore
    const state = this.clickState[criterio];
    state.count = (state.count + 1) % 3;

    // Imposta la direzione della freccia
    if (state.count === 1) {
      state.direction = 'asc'; // Crescente
    } else if (state.count === 2) {
      state.direction = 'desc'; // Decrescente
    } else {
      state.direction = ''; // Nessuna freccia
    }

    // Ordinamento
    this.sortDirection(criterio, state.direction);
  }

  // Metodo di ordinamento
  sortDirection(criterio: string, direction: 'asc' | 'desc' | ''): void {
    switch (criterio) {
      case 'nome':
        this.sortedUsers.sort((a, b) => this.compareValues(a.nome, b.nome, direction));
        break;
      case 'cognome':
        this.sortedUsers.sort((a, b) => this.compareValues(a.cognome, b.cognome, direction));
        break;
      case 'livello':
        this.sortedUsers.sort((a, b) => this.compareValues(a.livello, b.livello, direction));
        break;
      case 'bannato':
        this.sortedUsers.sort((a, b) => this.compareValues(a.bannato ? 1 : 0, b.bannato ? 1 : 0, direction));
        break;
    }
  }

  // Funzione per comparare i valori in base alla direzione
  compareValues(a: any, b: any, direction: 'asc' | 'desc' | ''): number {
    // Ordinamento crescente (asc)
    if (direction === 'asc') {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }
    // Ordinamento decrescente (desc)
    if (direction === 'desc') {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    }
    return 0; // Nessun ordinamento se la direzione è vuota
  }

  // Metodo per resettare gli altri pulsanti
  resetOtherButtons(criterio: string): void {
    Object.keys(this.clickState).forEach(key => {
      if (key !== criterio) {
        // @ts-ignore
        this.clickState[key].count = 0;
        // @ts-ignore
        this.clickState[key].direction = '';
      }
    });
  }

  gestisciUtente(id: number): void {
    this.router.navigate([`/users/${id}`]);
  }
}

