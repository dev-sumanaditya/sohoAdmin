import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { shareReplay, filter } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject = new ReplaySubject<any>(1);
  currentUser = this.currentUserSubject.asObservable().pipe(filter(user => !!user), shareReplay(1));
  jwtToken = '';

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {

    this.afAuth.onAuthStateChanged(async user => this.ngZone.run(async () => {
      if (user) {
        this.jwtToken = await (await this.afAuth.currentUser).getIdToken(true);
      } else {
        this.jwtToken = '';
      }
      const data = await this.http.post<any>(environment.apiUrl + '/user', user , {headers: {Authorization: `${this.jwtToken}`}}).toPromise();
      this.currentUserSubject.next(data.data);
    }));
  }

  async setAuthPersistance() {
    await this.afAuth.setPersistence(auth.Auth.Persistence.LOCAL);
  }
  async login(email: string, password: string) {
    try {
      await this.setAuthPersistance();
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);
      const token = await (await this.afAuth.currentUser).getIdToken(true);
      const data = await this.http.post<any>(environment.apiUrl + '/user', user.user , {headers: {Authorization: `${token}`}}).toPromise();
      return data.data;
    } catch (error) {
      await this.afAuth.signOut();
      throw error;
    }
  }
  logout() {
    this.afAuth.signOut();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth']);
  }

  async registerUser(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = await this.afAuth.currentUser;
    await user.sendEmailVerification();
    return user;
  }
}
