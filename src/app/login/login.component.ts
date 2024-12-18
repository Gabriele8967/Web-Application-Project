import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  constructor(private router: Router) {}

  onAccedi() {
    console.log('Navigazione a Home effettuata!');
    this.router.navigate(['/home']); // Naviga a Home
  }
}
