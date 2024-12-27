import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrenotazioniCampo} from "../Model/prenotazioniCampo";
import {AbilitaService} from './abilita.service';
import {AbilitiesComponent} from '../Components/abilities/abilities.component';
import {MatchRequest} from '../Model/matchRequest';

@Injectable({
    providedIn: 'root'
})

export class MatchmakingService {
    private url : string = "http://localhost:8080/api";
    constructor(public http:HttpClient) {}

    getPrenotazioni(): Observable<PrenotazioniCampo[]>{
        return this.http.get<PrenotazioniCampo[]>(this.url + "/prenotazioni");
    }

    inAttesa(): Observable<PrenotazioniCampo[]>{
        return this.http.get<PrenotazioniCampo[]>(this.url + "/inAttesa");
    }

    getPrenotazioniGiocatore(idGiocatore:number): Observable<PrenotazioniCampo[]>{
      return this.http.get<PrenotazioniCampo[]>(this.url + "/prenotazioni/" + idGiocatore);
    }

    completaMatch(matchrequest: MatchRequest): Observable<boolean>{

      return this.http.post<boolean>(this.url + "/completaMatch",matchrequest);
    }

    annullaPrenotazione(id:number): Observable<boolean>{
      return this.http.post<boolean>(this.url + "/annullaPrenotazione/" + id, id);
    }

}
