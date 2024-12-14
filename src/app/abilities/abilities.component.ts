import { Component } from '@angular/core';

@Component({
  selector: 'app-abilities',
  imports: [],
  templateUrl: './abilities.component.html',
  standalone: true,
  styleUrl: './abilities.component.css'
})
export class AbilitiesComponent {

  forehand: number=70;
  backhand: number= 64;
  serve: number=62;
  slice: number= 34;
  shortball: number=70;
  strenght: number= 78;


  getBarColor(ability: number): string {
    if (ability >= 70) return 'bg-success';
    if (ability >= 50) return 'bg-warning';
    return 'bg-danger';
  }

}
