import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {CampoService} from '../../Services/campo.service';
import {Campo} from '../../Model/campo';
import {DisponibilitaService} from '../../Services/disponibilita.service';
import {OrariDisponibili} from '../../Model/orariDisponibili';

@Component({
  selector: 'app-book-field',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './book-field.component.html',
  standalone: true,
  styleUrl: './book-field.component.css'
})
export class BookFieldComponent implements OnInit{

  constructor(public campoService:CampoService,public disponibilitaService: DisponibilitaService) {}
  campi : Campo[] = [];
  orariDisponibili : OrariDisponibili[] = [];

  ngOnInit(): void {
        this.campoService.getCampi().subscribe(res=>{
          this.campi = res;
        })

        this.disponibilitaService.getDisponibilita().subscribe(res=>{
          this.orariDisponibili = res;
        })
    }




}
