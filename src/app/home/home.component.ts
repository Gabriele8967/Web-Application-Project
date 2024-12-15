import { Component } from '@angular/core';
import {CardsComponent} from '../cards/cards.component';
import {CarouselComponent} from '../carousel/carousel.component';
import {IntroGuideComponent} from '../intro-guide/intro-guide.component';
import {WhatIsComponent} from '../what-is/what-is.component';

@Component({
  selector: 'app-home',
  imports: [
    CardsComponent,
    CarouselComponent,
    IntroGuideComponent,
    WhatIsComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
