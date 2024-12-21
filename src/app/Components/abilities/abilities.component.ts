import {Component, OnInit} from '@angular/core';
import {AbilitaService} from '../../Services/abilita.service';
import {Abilita} from '../../Model/abilita';

@Component({
  selector: 'app-abilities',
  imports: [],
  templateUrl: './abilities.component.html',
  standalone: true,
  styleUrl: './abilities.component.css'
})
export class AbilitiesComponent implements OnInit{

  constructor(public abilities: AbilitaService) {}

  abilita: Abilita | undefined;
  forehand: number = 0;
  backhand: number = 0;
  serve: number = 0;
  slice: number = 0;
  shortball: number = 0;
  strenght: number = 0;

  ngOnInit(): void {
        this.abilities.getAbilita(1).subscribe(res=>{
          console.log(res);
          this.abilita = res;
          this.forehand = this.abilita.dritto;
          this.backhand = this.abilita.rovescio;
          this.serve = this.abilita.servizio;
          this.slice = this.abilita.slice;
          this.shortball = this.abilita.palla_corta;
          this.strenght = this.abilita.resistenza;
        })

    }


  getBarColor(ability: number): string {
    if (ability >= 70) return 'bg-success';
    if (ability >= 50) return 'bg-warning';
    return 'bg-danger';
  }

}
