import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule
  ],
  templateUrl: './users.component.html',
  standalone: true,
  styleUrl: './users.component.css'
})
export class UsersComponent {
  filters = {
    name: '',
    status: 'active',
  };
  users = [];

  constructor(private http: HttpClient) {}

  applyFilters() {
    const queryParams = new URLSearchParams({
      name: this.filters.name,
      status: this.filters.status,
    }).toString();

    this.http.get(`/api/users?${queryParams}`).subscribe((data: any) => {
      this.users = data;
    });
  }
}
