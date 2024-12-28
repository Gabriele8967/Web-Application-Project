import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RegistrazioneService} from '../../Services/registrazione.service';

@Component({
  selector: 'app-registrazione',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {

  userObject: any = {
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    password: '',
    username: ''
  };

  constructor(private registrazioneService: RegistrazioneService) {}

  getValues(value: any) {
    console.log(value); // Mostra i valori nel terminale per il debug
  }

  onRegistra() {
    // Invia la richiesta di registrazione al backend
    this.registrazioneService.registrati(this.userObject).subscribe(
      (response: string) => {
        console.log('Registrazione riuscita:', response);
        alert('Registrazione completata con successo!');
        window.location.href = 'https://www.google.com'; // Redirige dopo il successo
      },
      (error: any) => {
        console.error('Errore durante la registrazione:', error);
        alert('Errore nella registrazione. Prova di nuovo!');
      }
    );
  }
}
