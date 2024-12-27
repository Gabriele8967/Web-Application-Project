import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {PrenotazioniCampo} from '../../Model/prenotazioniCampo';
import {MatchmakingService} from '../../Services/matchmaking.service';
import {GiocatoreService} from '../../Services/giocatore.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-reservation-history',
    imports: [
        RouterLink,
        NgForOf,
        NgIf,
    ],
  templateUrl: './reservation-history.component.html',
  standalone: true,
  styleUrl: './reservation-history.component.css'
})
export class ReservationHistoryComponent implements OnInit{

  prenotazioni: PrenotazioniCampo[] = [];
  usernames: { [key: number]: string } = {};


  constructor(private prenotazioniService: MatchmakingService, public giocatoreService: GiocatoreService) {
  }
  ngOnInit(): void {
    this.prenotazioniService.getPrenotazioniGiocatore(1).subscribe(res=>{
      this.prenotazioni = res;

      res.forEach(prenotazione => {
        forkJoin({
          giocatore: this.giocatoreService.getDatiGiocatore(prenotazione.giocatore2),
        }).subscribe(({ giocatore }) => {
          this.usernames[prenotazione.giocatore2] = giocatore.username;
        });
      });
    })
  }

  salvaPartita(){
  }

}
