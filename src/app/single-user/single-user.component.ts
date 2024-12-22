import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users/users.service';
import { Users } from '../models/users';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Request } from '../models/request';

@Component({
  selector: 'app-users',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class SingleUserComponent implements OnInit {
  user: Users | undefined;

  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      alert('ID utente non valido.');
      this.router.navigate(['/users']);
      return;
    }

    this.service.getUserById(id).subscribe({
      next: (user: Users) => {
        this.user = user;
      },
      error: () => {
        alert('Errore nel recupero dei dati utente.');
        this.router.navigate(['/users']);
      }
    });
  }

  banUser(id: number): void {
    this.service.banUser(id).subscribe({
      next: (response: Request) => {
        alert(response.messaggio);
        if (response.esito) {
          this.user!.bannato = true;
        }
      },
      error: (error) => {
        alert(`Errore nella comunicazione con il backend: ${error.message}`);
      }
    });
  }

  unbanUser(id: number): void {
    this.service.unbanUser(id).subscribe({
      next: (response: Request) => {
        alert(response.messaggio);
        if (response.esito) {
          this.user!.bannato = false;
        }
      },
      error: (error) => {
        alert(`Errore nella comunicazione con il backend: ${error.message}`);
      }
    });
  }
}
