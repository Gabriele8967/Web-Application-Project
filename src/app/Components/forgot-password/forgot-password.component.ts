import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {GiocatoreService} from '../../Services/giocatore.service';
import {LoginService} from '../../Services/login.service';

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

  constructor(private router: Router, private giocatoreService: GiocatoreService, private  loginService: LoginService) {}

  onRecupera() {
    localStorage.setItem('email',this.userObject.email)    // Verifica se l'email è valida prima di inviare la richiesta
    if (this.userObject.email) {
      this.giocatoreService.sendOtp(this.userObject.email).subscribe(
        response => {
          this.loginService.authenticate();
          alert('OTP inviata con successo!');
          this.router.navigate(['/otp'])
          console.log(response); // Gestire la risposta
        },
        error => {
          alert ('Errore durante l\'invio della OTP.');
          console.error(error); // Gestire l'errore
        }
      );
    } else {
      alert('Per favore, inserisci un\'email valida.');
    }
  }
}
