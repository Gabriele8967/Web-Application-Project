import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {CampoService} from '../../Services/campo.service';
import {Campo} from '../../Model/campo';
import {DisponibilitaService} from '../../Services/disponibilita.service';
import {OrariDisponibili} from '../../Model/orariDisponibili';

@Component({
  selector: 'app-book-field',
  imports: [
    RouterLink,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './book-field.component.html',
  standalone: true,
  styleUrl: './book-field.component.css'
})
export class BookFieldComponent implements OnInit{

  constructor(public campoService:CampoService,public disponibilitaService: DisponibilitaService) {}
  campi : Campo[] = [];
  orariDisponibili : OrariDisponibili[] = [];
  orariSelezionato: string | null  = null;
  campoSelezionato: number | null = null;


  ngOnInit(): void {
        this.campoService.getCampi().subscribe(res=>{
          this.campi = res;
          console.log(this.campi);
        })

        this.disponibilitaService.getDisponibilita().subscribe(res=>{
          this.orariDisponibili = res;
          console.log(this.orariDisponibili);
        })

    }



  selezionaOrario(orario: string, idCampo: number): void {
    this.orariSelezionato = orario;
    this.campoSelezionato = idCampo;
    console.log(this.campoSelezionato);
    console.log(this.orariSelezionato);
  }



}
