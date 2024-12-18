import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { UsersService } from '../services/users/users.service';
import { Users } from '../models/users';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink] // Aggiungi CommonModule qui
})
export class UsersComponent implements OnInit {
  users: Users[] = [];

  constructor(private service: UsersService) {}

  ngOnInit() {
    this.service.getUsers().subscribe((users: Users[]) => {
      this.users = users;
    });
  }
}
