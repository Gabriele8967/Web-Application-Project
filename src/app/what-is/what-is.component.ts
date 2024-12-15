import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-what-is',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './what-is.component.html',
  standalone: true,
  styleUrl: './what-is.component.css'
})
export class WhatIsComponent {

}
