import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return user(this.auth).pipe(
      map(usuario => {
        if (usuario) {
          return true;
        } else {
          this.router.navigateByUrl('/login');
          return false;
        }
      })
    );
  }
}