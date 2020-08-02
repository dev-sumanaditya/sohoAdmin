import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({ providedIn: 'root' })
export class AntiAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.currentUserSubject.pipe(map(data => {
          if (data !== null) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        }), take(1));
    }
}
