import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.jwtToken !== '' && !request.url.includes('digitalocean')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${this.auth.jwtToken}`
                }
            });
        }

        return next.handle(request);
    }
}
