import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public settings = [
    {name: 'Role Settings', url: 'role'},
    {name: 'Account Settings', url: 'account'},
    {name: 'Bacic Site Settings', url: 'site'},
    {name: 'Api Key Settings', url: ''},
  ];

  public sub;
  public data;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.sub = this.auth.currentUser.subscribe(
      data => {
        this.data = data;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
