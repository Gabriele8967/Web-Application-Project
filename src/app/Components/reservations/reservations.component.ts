import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GiocatoreService} from '../../Services/giocatore.service';
import {CommonModule} from '@angular/common';
import {PrenotazioniCampo} from '../../Model/prenotazioniCampo';
import {MatchmakingService} from '../../Services/matchmaking.service';
import {forkJoin} from 'rxjs';


@Component({
  selector: 'app-reservations',
  imports: [
    RouterLink,
    CommonModule

  ],
  templateUrl: './reservations.component.html',
  standalone: true,
  styleUrl: './reservations.component.css'
})

export class ReservationsComponent implements OnInit {

  prenotazioni: PrenotazioniCampo[] = [];
  usernames: { [key: number]: string } = {};


  constructor(private prenotazioniService: MatchmakingService, public giocatoreService: GiocatoreService) {}

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

  annullaPrenotazione(idPrenotazione: number){
    this.prenotazioniService.annullaPrenotazione(idPrenotazione).subscribe();
  }

}
