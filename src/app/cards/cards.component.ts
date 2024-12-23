import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cards',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './cards.component.html',
  standalone: true,
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  todayDate: string;

  constructor() {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }
}
