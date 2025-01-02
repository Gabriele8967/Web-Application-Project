import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GiocatoreService} from '../../Services/giocatore.service';

@Component({
  selector: 'app-set-dati',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './set-dati.component.html',
  standalone: true,
  styleUrl: './set-dati.component.css'
})
export class SetDatiComponent {

  userObject = {
    newUsername: '',
    newEmail:'',
    newNumber: ''
  };

  constructor(private router: Router, private giocatoreService: GiocatoreService) {}
  email = localStorage.getItem('email');

  onSaveUsername(){
    if (this.userObject.newUsername || this.email) {
      this.giocatoreService.updateUsername(<string>this.email,this.userObject.newUsername).subscribe(
          (response: any) => {
          alert('Username aggiornata con successo!');
          console.log(response); // Gestire la risposta
        },
          (error: any) => {
          alert ('Errore durante l\'aggiornamento dello Username.');
          console.error(error); // Gestire l'errore
        }
      );
    } else {
      alert('Per favore, inserisci un\'email valida.');
    }
  }
  onSaveEmail(){
    if (this.userObject.newEmail || this.email) {
      this.giocatoreService.updateEmail(<string>this.email,this.userObject.newEmail).subscribe(
        (response: any) => {
          localStorage.setItem('email',this.userObject.newEmail)
          alert('Email aggiornata con successo!');
          console.log(response); // Gestire la risposta
        },
        (error: any) => {
          alert ('Errore durante l\'aggiornamento della email.');
          console.error(error); // Gestire l'errore
        }
      );
    } else {
      alert('Per favore, inserisci un\'email valida.');
    }
  }
  onSaveNumber(){
  }
}
