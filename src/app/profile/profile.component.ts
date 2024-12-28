import { Component, OnInit } from '@angular/core';
import {Profile} from '../models/profile';
import {ProfileService} from '../services/profile/profile.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null; // Oggetto per salvare i dati del profilo
  isEditing: boolean = false; // Flag per la modalità modifica

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getProfile();
  }


  getProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data: Profile) => (this.profile = data),
      error: (err) => console.error('Errore nel recupero del profilo:', err)
    });
  }


  editProfile(): void {
    this.isEditing = true;
  }


  saveProfile(): void {
    if (this.profile) {
      this.profileService.updateProfile(this.profile).subscribe({
        next: () => {
          this.isEditing = false;
          alert('Profilo aggiornato con successo!');
        },
        error: (err) => console.error('Errore durante l\'aggiornamento del profilo:', err)
      });
    }
  }


  cancelEdit(): void {
    this.isEditing = false;
    this.getProfile();
  }
}
