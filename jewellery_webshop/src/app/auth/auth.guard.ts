import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { } 

  canActivate() {
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      alert("Bejelentkezés után tekinthető meg!")
      return false;
    }
  }
  
}