import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campo} from "../Model/campo";
import {Giocatore} from '../Model/giocatore';

@Injectable({
    providedIn: 'root'
})

export class CampoService{
    private url : string = "http://localhost:8080/api";

    constructor(public http: HttpClient) {}

    getCampi(): Observable<Campo[]> {
        return this.http.get<Campo[]>(this.url + "/campi");
    }
    getDatiCampo(idCampo: number): Observable<Campo>{
    return this.http.get<Campo>(this.url + "/campi/" + idCampo);
    }
}
