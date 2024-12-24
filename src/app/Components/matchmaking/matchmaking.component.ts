import {Component, OnInit} from '@angular/core';
import {MatchmakingService} from '../../Services/matchmaking.service';
import {PrenotazioniCampo} from '../../Model/prenotazioniCampo';
import {NgForOf} from '@angular/common';
import {GiocatoreService} from '../../Services/giocatore.service';
import {CampoService} from '../../Services/campo.service';

@Component({
  selector: 'app-matchmaking',
  imports: [
    NgForOf
  ],
  templateUrl: './matchmaking.component.html',
  standalone: true,
  styleUrl: './matchmaking.component.css'
})
export class MatchmakingComponent implements OnInit {
  matchInAttesa: PrenotazioniCampo[] = [];
  usernames: { [key: number]: string } = {};
  campi: { [key: number]: string} = {};

  constructor(public match: MatchmakingService, public giocatoreService: GiocatoreService, public campoService: CampoService) {
  }

  ngOnInit(): void {
    this.match.inAttesa().subscribe(res => {
      this.matchInAttesa = res;
      res.forEach(prenotazione => {
        this.giocatoreService.getDatiGiocatore(prenotazione.giocatore1).subscribe(giocatore => {
          this.usernames[prenotazione.giocatore1] = giocatore.username;
        })
        this.campoService.getDatiCampo(prenotazione.campo).subscribe(campo=>{
          this.campi[prenotazione.campo] = campo.superficie;
          console.log(campo)
        })
      })
    })
  }
}
