import { Component } from '@angular/core';
import {CardsComponent} from '../cards/cards.component';
import {CarouselComponent} from '../carousel/carousel.component';
import {IntroGuideComponent} from '../intro-guide/intro-guide.component';
import {WhatIsComponent} from '../what-is/what-is.component';
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
