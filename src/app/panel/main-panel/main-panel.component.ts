import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  public sideMenuOpen = true;

  constructor() { }

  public menu = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      url: 'dashboard'
    },
    {
      name: 'Users',
      icon: 'users',
      url: 'users'
    },
    {
      name: 'Instructors',
      icon: 'members',
      url: 'instructors'
    },
    {
      name: 'Website Settings',
      icon: 'website',
      url: 'website-settings'
    },
    {
      name: 'Admins',
      icon: 'admins',
      url: 'admins'
    },
    {
      name: 'Settings',
      icon: 'settings',
      url: 'settings'
    }
  ]

  ngOnInit(): void {
  }

  toggleMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

}
