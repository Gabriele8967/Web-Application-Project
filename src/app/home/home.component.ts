import { Component } from '@angular/core';
import {CardsComponent} from '../cards/cards.component';
import {BentornatoComponent} from '../bentornato/bentornato.component';

@Component({
  selector: 'app-home',
  imports: [
    BentornatoComponent,
    CardsComponent,


  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
