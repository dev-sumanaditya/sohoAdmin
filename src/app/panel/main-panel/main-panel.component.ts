import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit, OnDestroy {

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
      name: 'Courses',
      icon: 'courses',
      url: 'courses'
    },
    {
      name: 'Payments',
      icon: 'payments',
      url: 'payments'
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
  ];

  public sideMenuOpen = true;
  public userData = null;
  private sub;
  public loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
  ) { }

  ngOnInit(): void {
    this.sub = this.auth.currentUser.subscribe(
      data => {
        this.userData = data;
      }
    );

    if (isPlatformBrowser(this.platformId)) {
      this.router.events.forEach((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
          return;
        }
        if (event instanceof NavigationEnd) {
          this.loading = false;
          return;
        }
        if (event instanceof NavigationCancel) {
          this.loading = false;
          return;
        }
        if (event instanceof NavigationError) {
          this.loading = false;
          return;
        }
      });
    }
  }

  toggleMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

  logOut() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
