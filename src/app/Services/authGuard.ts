import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {}

    canActivate(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot){
        return this.loginService.isAuthenticated()
    }
}

