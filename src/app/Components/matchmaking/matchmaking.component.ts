import {Component, OnInit} from '@angular/core';
import {MatchmakingService} from '../../Services/matchmaking.service';
import {PrenotazioniCampo} from '../../Model/prenotazioniCampo';
import {DatePipe, NgForOf} from '@angular/common';
import {GiocatoreService} from '../../Services/giocatore.service';
import {CampoService} from '../../Services/campo.service';
import {forkJoin} from 'rxjs';
import {MatchRequest} from '../../Model/matchRequest';

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
  livelli: { [key: number]: number} = {};
  matchRequest: MatchRequest = {idPrenotazione:0,idGiocatore:0};


  constructor(public datePipe: DatePipe, public match: MatchmakingService, public giocatoreService: GiocatoreService, public campoService: CampoService) {}


ngOnInit(): void {
  this.match.inAttesa().subscribe(res => {
    this.matchInAttesa = res;

    res.forEach(prenotazione => {
      forkJoin({
        giocatore: this.giocatoreService.getDatiGiocatore(prenotazione.giocatore1),
        campo: this.campoService.getDatiCampo(prenotazione.campo),
      }).subscribe(({ giocatore, campo }) => {
        this.usernames[prenotazione.giocatore1] = giocatore.username;
        this.campi[prenotazione.campo] = campo.superficie;
        this.livelli[prenotazione.giocatore1] = giocatore.livello;
      });
    });
  });
}


getDataFormattata(data:string){
    return this.datePipe.transform(data,'d MMMM y', 'it-IT');
  }

  getOrarioFineMatch(orario:string){
    const orarioInt = parseInt(orario, 10);
    return ((orarioInt + 1) % 24).toString().padStart(2, '0');
  }

  getOrarioFineAttesa(orario: string): string {
    let [ore, minuti] = orario.split(':').map((parte) => parseInt(parte, 10));
    minuti += 10;
    if (minuti >= 60) {
      minuti -= 60;
      ore += 1;
    }
    if (ore >= 24) {
      ore -= 24;
    }
    return `${ore.toString().padStart(2, '0')}:${minuti.toString().padStart(2, '0')}`;
  }

  completaMatch(idPrenotazione:number, idGiocatore:number){
    this.matchRequest = {idPrenotazione: idPrenotazione, idGiocatore: idGiocatore};
    this.match.completaMatch(this.matchRequest);
    console.log(this.matchRequest)
  }

}
