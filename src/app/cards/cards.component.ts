import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-cards',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './cards.component.html',
  standalone: true,
  styleUrl: './cards.component.css'
})
export class CardsComponent {


}
