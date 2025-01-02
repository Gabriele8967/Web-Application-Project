import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {GiocatoreService} from '../../Services/giocatore.service';

@Component({
  selector: 'app-update-lost-password',
  imports: [
    FormsModule
  ],
  standalone:true,
  templateUrl: './update-lost-password.component.html',
  styleUrl: './update-lost-password.component.css'
})
export class UpdateLostPasswordComponent {

  userObject = {
    newPassword: '',
    verifyNewPassword:''
  };

  constructor(private router: Router, private giocatoreService: GiocatoreService) {}
  email = localStorage.getItem('email');

  setNewPass() {
    if (this.userObject.newPassword==this.userObject.verifyNewPassword || this.email) {
      this.giocatoreService.updatePass(<string>this.email,this.userObject.newPassword).subscribe(
        response => {
          alert('Password aggiornata con successo!');
          this.router.navigate(['/home'])
          console.log(response); // Gestire la risposta
        },
        error => {
          alert ('Errore durante l\'aggiornamento della Password.');
          console.error(error); // Gestire l'errore
        }
      );
    } else {
      alert('Per favore, inserisci un\'email valida.');
    }
  }
}
