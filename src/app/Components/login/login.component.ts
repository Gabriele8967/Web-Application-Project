import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule, FormBuilder} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {LoginService} from '../../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  Stato: number = 0; // 0 = Iniziale, 1 = Accesso


userObject: any={
    email: "",
    password: "",
  }

  constructor(private router: Router, private loginService: LoginService) {
    this.Stato = 0;
  }

  onAccedi() {
    if(this.Stato==0) {
      this.loginService.login(this.userObject.email, this.userObject.password).subscribe(
        (response) => {
          console.log('Login riuscito:', response);
          localStorage.setItem('email',this.userObject.email)
          this.loginService.authenticate();
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login fallito:', error);
          if (error.status === 401) {
            alert('Email o password errati');
          } else {
            alert('Si è verificato un errore sconosciuto');
          }
        }
      );
    }
    else{
      window.location.href = 'https://www.google.com';
    }
  }




accediAdmin() {
   this.Stato=1;
   console.log(this.Stato)
  }

  accediMaestro() {
   this.Stato=1;
   console.log(this.Stato)

  }

  getValues(val: any){

  //  console.warn(val)
  }


}
