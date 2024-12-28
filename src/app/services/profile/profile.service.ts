import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Profile} from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}


  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }


  updateProfile(profile: Profile): Observable<void> {
    return this.http.put<void>(this.apiUrl, profile);
  }
}
