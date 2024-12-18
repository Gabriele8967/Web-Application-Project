import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-navbar-buttons',
  templateUrl: './navbar-buttons.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./navbar-buttons.component.css']
})
export class NavbarButtonsComponent {

  constructor(private router: Router, private authService: AuthService) {}

  // Metodo per fare il logout
  logout(): void {
    this.authService.logout(); // Chiama il metodo logout del servizio AuthService
    this.router.navigate(['/login']); // Reindirizza alla pagina di login dopo il logout
  }
}
