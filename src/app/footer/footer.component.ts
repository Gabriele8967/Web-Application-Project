import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email: string = "easymatch@gmail.com";
  tel: number = 123456789;
}
