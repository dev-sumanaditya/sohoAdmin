import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth.currentUserSubject.pipe(map(
          data => {
            if (data === null) {
              this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
              return false;
            }
            return true;
          }
        ), take(1));
    }
}
