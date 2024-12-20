import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { UsersService } from '../services/users/users.service';
import { Users } from '../models/users';
import {ActivatedRoute, RouterLink} from '@angular/router';

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
    private route: ActivatedRoute   // Inietta ActivatedRoute per ottenere l'ID dalla rotta
  ) {}

  ngOnInit() {
    // Ottieni l'ID dalla rotta e usa getUserById per ottenere i dettagli dell'utente
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');  // Usa l'ID della rotta
    this.service.getUserById(id).subscribe((user: Users) => {
      this.user = user;  // Assegna i dettagli dell'utente alla variabile user
    });
  }
}
