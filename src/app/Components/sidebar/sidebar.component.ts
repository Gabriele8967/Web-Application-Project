import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {GiocatoreService} from '../../Services/giocatore.service';
import {NgOptimizedImage} from '@angular/common';
import {LoginService} from '../../Services/login.service';

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
  constructor(private router: Router,public datiGiocatore: GiocatoreService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.datiGiocatore.getDatiGiocatore(1).subscribe(res=>{
      this.imgProfilo = res.immagine_profilo;
      this.nomeUtente = res.username;
      console.log(res);
    })
  }


  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
