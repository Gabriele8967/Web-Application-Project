import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {GiocatoreService} from '../../Services/giocatore.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-set-password',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './set-password.component.html',
  standalone: true,
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent {

  userObject = {
    newPassword: '',
    verifyNewPassword:''
  };

  constructor(private router: Router, private giocatoreService: GiocatoreService) {}
  email = localStorage.getItem('email');

  onSave() {
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
