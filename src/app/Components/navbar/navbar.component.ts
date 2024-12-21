import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    SidebarComponent,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
