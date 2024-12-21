import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-reservation-history',
  imports: [
    RouterLink,
  ],
  templateUrl: './reservation-history.component.html',
  standalone: true,
  styleUrl: './reservation-history.component.css'
})
export class ReservationHistoryComponent {

}
