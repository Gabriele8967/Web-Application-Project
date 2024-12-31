import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {GiocatoreService} from '../../Services/giocatore.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  userObject = {
    email: ''
  };

  constructor(private router: Router, private giocatoreService: GiocatoreService) {}

  onRecupera() {
    console.log(this.userObject.email)
    // Verifica se l'email è valida prima di inviare la richiesta
    if (this.userObject.email) {
      this.giocatoreService.recuperaPass(this.userObject.email).subscribe(
        response => {
          alert('Password aggiornata con successo!');
          console.log(response); // Gestire la risposta
        },
        error => {
          alert ('Errore durante il recupero della password.');
          console.error(error); // Gestire l'errore
        }
      );
    } else {
      alert('Per favore, inserisci un\'email valida.');
    }
  }
}
