import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-book-field',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './book-field.component.html',
  standalone: true,
  styleUrl: './book-field.component.css'
})
export class BookFieldComponent {
  campi = [
    { id: 1, title: 'Campo 1',  image: '/assets/image/campo1.jpg' },
    { id: 2, title: 'Campo 2',  image: '/assets/image/campo2.jpg' },
    { id: 3, title: 'Campo 3',  image: '/assets/image/campo3.jpg' },
    { id: 4, title: 'Campo 4',  image: '/assets/image/campo4.jpg' },
    { id: 5, title: 'Campo 5',  image: '/assets/image/campo5.jpg' },
    { id: 6, title: 'Campo 6',  image: '/assets/image/campo6.jpg' },
    { id: 7, title: 'Campo 7',  image: '/assets/image/campo7.jpg' },
    { id: 8, title: 'Campo 8',  image: '/assets/image/campo8.jpg' },
    { id: 9, title: 'Campo 9',  image: '/assets/image/campo9.jpg' },
    { id: 10, title: 'Campo 10',  image: '/assets/image/campo10.jpg' },
  ];
}
