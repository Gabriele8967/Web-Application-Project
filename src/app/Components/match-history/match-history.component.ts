import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {PrenotazioniCampo} from '../../Model/prenotazioniCampo';
import {MatchmakingService} from '../../Services/matchmaking.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-match-history',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './match-history.component.html',
  standalone: true,
  styleUrl: './match-history.component.css'
})
export class MatchHistoryComponent implements OnInit{


  constructor() {
  }
    ngOnInit(): void {

    }

}
