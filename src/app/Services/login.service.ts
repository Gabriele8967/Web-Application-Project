import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/login';
  private isAuth = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });

  }


  authenticate(): void {
    this.isAuth = true;
  }

  logout(): void {
    this.isAuth = false;
    console.log(this.isAuth  )
  }
  isAuthenticated(): boolean {
    console.log(this.isAuth  )
    return this.isAuth;
  }

}
