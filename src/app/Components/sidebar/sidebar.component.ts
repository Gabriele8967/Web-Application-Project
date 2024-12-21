import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GiocatoreService} from '../../Services/giocatore.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  imgProfilo: string = "";
  nomeUtente: string = "";
  constructor(public datiGiocatore: GiocatoreService) {}

  ngOnInit(): void {
        this.datiGiocatore.getDatiGiocatore(1).subscribe(res=>{
          this.imgProfilo = res.immagine_profilo;
          this.nomeUtente = res.username;
          console.log(res);
        })
    }




}
