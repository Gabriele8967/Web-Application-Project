import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CardsComponent} from '../cards/cards.component';
import {NavbarButtonsComponent} from '../navbar-buttons/navbar-buttons.component';

@Component({
  selector: 'app-navbar',
  imports: [

    RouterLink,
    CardsComponent,
    NavbarButtonsComponent,

  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logout() {

  }
}
