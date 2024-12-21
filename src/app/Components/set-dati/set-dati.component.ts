import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-set-dati',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './set-dati.component.html',
  standalone: true,
  styleUrl: './set-dati.component.css'
})
export class SetDatiComponent {

  form: FormGroup;

constructor(public fb: FormBuilder) {
this.form = fb.group({
  'user': [''], //Validators.require
  'email': ['',Validators.email],
  'phone': ['']
});
}

send(): void {
  if (this.form.valid){
    console.log("ok");
    return;
  }
  else {
    alert("errore");
  }
}



}
