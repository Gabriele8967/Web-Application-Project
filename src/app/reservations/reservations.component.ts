import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-reservations',
  imports: [

    RouterLink,


  ],
  templateUrl: './reservations.component.html',
  standalone: true,
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

}
