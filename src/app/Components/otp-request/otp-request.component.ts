import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {GiocatoreService} from '../../Services/giocatore.service';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../Services/login.service';

@Component({
  selector: 'app-otp-request',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './otp-request.component.html',
  styleUrl: './otp-request.component.css'
})
export class OtpRequestComponent {
  userObject = {
    email: '',
    otpCode: ''
  };

  constructor(private router: Router, private giocatoreService: GiocatoreService,private loginService: LoginService) {}

  verifica() {
    console.log(this.userObject.email)
    // Verifica se l'email è valida prima di inviare la richiesta
    if (this.userObject.email) {
      this.giocatoreService.verifyOtp(this.userObject.email,this.userObject.otpCode).subscribe(
        response => {
          alert('OTP inserito con successo!');
          this.loginService.authenticate();
          this.router.navigate(['/home']);
          console.log(response); // Gestire la risposta
        },
        error => {
          alert ('Errore durante l\'inserimento della OTP.');
          console.error(error); // Gestire l'errore
        }
      );
    } else {
      alert('Per favore, inserisci un\'email valida.');
    }
  }
}
