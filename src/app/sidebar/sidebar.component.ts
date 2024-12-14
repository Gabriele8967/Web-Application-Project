import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router:Router) {
  }
  imgProfilo: string = "/assets/image/iconaDefault.jpg";
  nomeUtente: string = "user";



}
