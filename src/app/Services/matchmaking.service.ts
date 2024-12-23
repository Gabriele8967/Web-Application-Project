import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrenotazioniCampo} from "../Model/prenotazioniCampo";

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

}
