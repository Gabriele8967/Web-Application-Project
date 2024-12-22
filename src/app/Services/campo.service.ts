import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campo} from "../Model/campo";

@Injectable({
    providedIn: 'root'
})

export class CampoService{
    private url : string = "http://localhost:8080/api";

    constructor(public http: HttpClient) {}

    getCampi(): Observable<Campo[]> {
        return this.http.get<Campo[]>(this.url + "/campi");
    }
}
