import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';

import {Giocatore} from '../../Model/giocatore';
import {GiocatoreService} from '../../Services/giocatore.service';
import {CommonModule} from '@angular/common';


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

  giocatori: Giocatore[] = [];

  constructor(public giocatoriService: GiocatoreService) {}


  ngOnInit(): void {

    this.giocatoriService.getGiocatori().subscribe(data=>{
      this.giocatori = data;
    })


  }
}
