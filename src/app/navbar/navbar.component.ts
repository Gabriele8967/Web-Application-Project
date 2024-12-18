import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {RouterLink} from '@angular/router';
import {CardsComponent} from '../cards/cards.component';
import {NavbarButtonsComponent} from '../navbar-buttons/navbar-buttons.component';

@Component({
  selector: 'app-navbar',
  imports: [
    SidebarComponent,
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
